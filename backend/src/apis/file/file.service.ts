import { Injectable } from '@nestjs/common';

import { FileUpload } from 'graphql-upload';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';

import { FILE_TYPE } from './entities/type.enum';
import { FileEntity } from './entities/file.entity';
import { FileRepository } from './entities/file.repository';

import { MediaServerService } from './media.service';
import { GoogleStorageSerivce } from './gStorage.service';

@Injectable()
export class FileService {
    constructor(
        private readonly fileRepository: FileRepository,
        private readonly mediaService: MediaServerService,
        private readonly gStorageService: GoogleStorageSerivce,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 구글 Storage //

    /**
     * 구글 Storage에 업로드 + DB에 저장
     */
    async uploadInGoogleStorage(
        type: FILE_TYPE,
        files: FileUpload[], //
    ): Promise<FileEntity[]> {
        // Google Storage 업로드
        const db_files = [];
        const tmps = await this.gStorageService.upload(type, files);
        type = type.toLowerCase() + '/';

        // DB Table에 추가
        tmps.forEach((v) => {
            const name = v.split('/').slice(-1)[0];
            const [_, prefix, suffix, ...__] = name
                .toLowerCase()
                .match(/^(.+).(png|jpe?g|gif|webp)$/);

            db_files.push(
                this.fileRepository.create({
                    path: `${type}origin/`,
                    name: name,
                    url: v,
                }),
            );
            db_files.push(
                this.fileRepository.create({
                    path: `${type}thumb/l/`,
                    name: `thumb_${prefix}_1280.${suffix}`,
                    url: `/${process.env.FILE_BUCKET}/${type}thumb/l/thumb_${prefix}_1280.${suffix}`,
                }),
            );
            db_files.push(
                this.fileRepository.create({
                    path: `${type}thumb/m/`,
                    name: `thumb_${prefix}_640.${suffix}`,
                    url: `/${process.env.FILE_BUCKET}/${type}thumb/m/thumb_${prefix}_640.${suffix}`,
                }),
            );
            db_files.push(
                this.fileRepository.create({
                    path: `${type}thumb/s/`,
                    name: `thumb_${prefix}_320.${suffix}`,
                    url: `/${process.env.FILE_BUCKET}/${type}thumb/s/thumb_${prefix}_320.${suffix}`,
                }),
            );
        });

        await Promise.all(db_files.map((v) => this.fileRepository.save(v)));

        // 반환
        return db_files;
    }

    /**
     * 삭제 ( Soft )
     */
    async softDeleteInGoogleStorage(
        fileIDs: string[], //
    ): Promise<ResultMessage[]> {
        // Google Storage 삭제
        const deleteFiles = await this.gStorageService.delete(fileIDs);

        // DB에도 삭제
        const results = await this.fileRepository.softDelete(fileIDs);

        return results.map((result, idx) => {
            const isSuccess = result.affected ? true : false;
            return new ResultMessage({
                id: deleteFiles[idx],
                isSuccess,
                contents: isSuccess
                    ? `Completed FileUpload Delete`
                    : `Failed FileUpload Delete`,
            });
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 미디어 서버 //

    /**
     * 미디어 서버에 업로드 + DB에 저장
     */
    async upload(
        type: FILE_TYPE,
        files: FileUpload[], //
    ): Promise<FileEntity[]> {
        const db_files = [];
        const tmps = await this.mediaService.upload(type, files);

        tmps.forEach((tmp: any) => {
            db_files.push(
                this.fileRepository.create({
                    path: tmp.dir,
                    name: tmp.name,
                    url: tmp.url,
                }),
            );
        });

        await Promise.all(db_files.map((v) => this.fileRepository.save(v)));

        // 반환
        return db_files;
    }

    /**
     * 미디어 서버에 업로드 + DB에 저장 + 썸네일 제작
     */
    async uploadWithThumb(
        type: FILE_TYPE,
        files: FileUpload[], //
    ): Promise<FileEntity[]> {
        const db_files = [];
        const tmps = await this.mediaService.upload_thumb(type, files);

        tmps.forEach((tmp: any) => {
            db_files.push(
                this.fileRepository.create({
                    path: tmp.dir,
                    name: tmp.name,
                    url: tmp.url,
                }),
            );
        });

        await Promise.all(db_files.map((v) => this.fileRepository.save(v)));

        // 반환
        return db_files;
    }

    /**
     * 삭제 ( Soft )
     */
    async softDelete(
        fileIDs: string[], //
    ): Promise<boolean[]> {
        // DB에 저장되어있는지 확인
        // DB에 저장되지 않은 것은 스킵
        const dbFiles = (
            await Promise.all(
                fileIDs.map((fileID) => this.fileRepository.findOne(fileID)),
            )
        ).filter((file) => file);

        // 미디어 서버에서 파일 삭제
        await this.mediaService.delete(dbFiles.map((v) => v.url));

        // DB에도 삭제
        const results = await this.fileRepository.softDelete(
            dbFiles.map((v) => v.id),
        );

        return results.map((result) => (result.affected ? true : false));
    }
}
