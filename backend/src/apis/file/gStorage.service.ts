import { Storage } from '@google-cloud/storage';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { v4 } from 'uuid';
import { FileRepository } from './entities/file.repository';

@Injectable()
export class GoogleStorageSerivce {
    constructor(
        private readonly fileRepository: FileRepository, //
    ) {}

    /**
     * GCP Storage Upload
     */
    async upload(
        folderName: string, //
        files: FileUpload[],
    ): Promise<Array<string>> {
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

        return storageUpload.filter((v) => v !== '');
    }

    /**
     * GCP Storage Delete
     */
    async delete(
        IDs: Array<string>, //
    ): Promise<Array<string>> {
        const key = `./key/${process.env.FILE_KEY}`;

        // DB에 저장되어있는지 확인
        // DB에 저장되지 않은 것은 스킵
        const dbFiles = (
            await Promise.all(
                IDs.map((fileID) => this.fileRepository.findOne(fileID)),
            )
        ).filter((file) => file);

        // 구글 Storage 연결
        const storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: key,
        }).bucket(process.env.FILE_BUCKET);

        // 구글 삭제
        return (
            (await Promise.all(
                dbFiles.map((file) => {
                    return new Promise((resolve, reject) => {
                        storage.file(`${file.path}${file.name}`).delete((e) => {
                            if (e) {
                                reject('');
                            } else {
                                resolve(file.id);
                            }
                        });
                    });
                }),
            )) as Array<string>
        ).filter((file) => file !== '');
    }
}
