import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';

import { FileEntity } from './entities/file.entity';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    async findAll(): Promise<FileEntity[]> {
        return await this.fileRepository.find({});
    }

    async findOne(
        fileID: string, //
    ): Promise<FileEntity> {
        return await this.fileRepository.findOne({
            where: { id: fileID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 구글 Storage에 업로드 + DB에 저장
     * @param folderName
     * @param files
     * @returns 구글 Storage URLs
     */
    async upload(
        folderName: string,
        files: FileUpload[], //
    ): Promise<FileEntity[]> {
        // 변수 초기화
        const writeFiles = await Promise.all(files);
        const key = `./key/${process.env.FILE_KEY}`;

        // 구글 Storage 연결
        const storage = new Storage({
            projectId: process.env.FILE_PROJECT_ID,
            keyFilename: key,
        }).bucket(process.env.FILE_BUCKET);

        // 업로드
        const storageUpload = (await Promise.all(
            writeFiles.map((file) => {
                return new Promise((resolve, reject) => {
                    if (file.filename !== '') {
                        // 확장자 분리
                        const [_, prefix, suffix, ...__] = file.filename
                            .toLowerCase()
                            .match(/^(.+).(png|jpe?g|gif|webp)$/);

                        // 이름 Hashing
                        file.filename = `${folderName}origin/${v4()}.${suffix}`;

                        file.createReadStream()
                            .pipe(
                                storage.file(file.filename).createWriteStream(),
                            )
                            .on('finish', () => {
                                resolve(
                                    `/${process.env.FILE_BUCKET}/${file.filename}`,
                                );
                            })
                            .on('error', (e) => reject(e));
                    } else {
                        resolve('');
                    }
                });
            }),
        )) as Array<string>;

        // DB Table에 추가
        const db_files = [];
        const tmps = storageUpload.filter((v) => v !== '');
        tmps.forEach((v) => {
            const name = v.split('/').slice(-1)[0];
            const [_, prefix, suffix, ...__] = name
                .toLowerCase()
                .match(/^(.+).(png|jpe?g|gif|webp)$/);

            db_files.push(
                this.fileRepository.create({
                    path: `${folderName}origin/`,
                    name: name,
                    url: v,
                }),
            );
            db_files.push(
                this.fileRepository.create({
                    path: `${folderName}thumb/l/`,
                    name: `thumb_${prefix}_1280.${suffix}`,
                    url: `/${process.env.FILE_BUCKET}/${folderName}thumb/l/thumb_${prefix}_1280.${suffix}`,
                }),
            );
            db_files.push(
                this.fileRepository.create({
                    path: `${folderName}thumb/m/`,
                    name: `thumb_${prefix}_640.${suffix}`,
                    url: `/${process.env.FILE_BUCKET}/${folderName}thumb/m/thumb_${prefix}_640.${suffix}`,
                }),
            );
            db_files.push(
                this.fileRepository.create({
                    path: `${folderName}thumb/s/`,
                    name: `thumb_${prefix}_320.${suffix}`,
                    url: `/${process.env.FILE_BUCKET}/${folderName}thumb/s/thumb_${prefix}_320.${suffix}`,
                }),
            );
        });

        await Promise.all(db_files.map((v) => this.fileRepository.save(v)));

        // 반환
        return db_files;
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 삭제 ( Soft )
     * @param fileIDs
     * @returns ResultMessage
     */
    async softDelete(
        fileIDs: string[], //
    ): Promise<ResultMessage[]> {
        const key = `./key/${process.env.FILE_KEY}`;

        // DB에 저장되어있는지 확인
        const dbFiles = await Promise.all(
            fileIDs.map((fileID) =>
                this.fileRepository.findOne({
                    where: { id: fileID },
                }),
            ),
        );

        // 하나라도 DB에 값이 저장되어있지 않다면
        // 에러
        for (let i = 0; i < dbFiles.length; i++) {
            if (!dbFiles[i]) {
                throw new UnprocessableEntityException(
                    '파일을 찾을 수 없습니다.',
                );
            }
        }

        // 구글 Storage 연결
        const storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: key,
        }).bucket(process.env.FILE_BUCKET);

        // 구글 삭제
        const storageUpload = await Promise.all(
            dbFiles.map((file) => {
                console.log(`${file.path}${file.name}`);
                return storage.file(`${file.path}${file.name}`).delete();
            }),
        );

        // DB에도 삭제
        const results = await Promise.all(
            dbFiles.map((file) =>
                this.fileRepository.softDelete({
                    id: file.id,
                }),
            ),
        );

        return results.map((result, idx) => {
            const isSuccess = result.affected ? true : false;
            return new ResultMessage({
                id: dbFiles[idx].id,
                isSuccess,
                contents: isSuccess
                    ? `Completed FileUpload Delete`
                    : `Failed FileUpload Delete`,
            });
        });
    }
}
