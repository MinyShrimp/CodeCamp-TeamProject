import { Injectable } from '@nestjs/common';

import { FileUpload } from 'graphql-upload';

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
        files: FileUpload[],
        isThumb: boolean,
    ): Promise<FileEntity[]> {
        const writeFiles = (await Promise.all(files)).filter(
            (file) => file.filename !== '',
        );

        // Google Storage 업로드
        const tmps = isThumb
            ? await this.gStorageService.uploadThumb(type, writeFiles)
            : await this.gStorageService.upload(type, writeFiles);

        // DB Table에 추가 후 반환
        return await Promise.all(tmps.map((v) => this.fileRepository.save(v)));
    }

    /**
     * 삭제 ( Soft )
     */
    async softDeleteInGoogleStorage(
        fileIDs: string[], //
    ): Promise<boolean[]> {
        // DB에 저장되어있는지 확인
        // DB에 저장되지 않은 것은 스킵
        const dbFiles = (
            await Promise.all(
                fileIDs.map((fileID) => this.fileRepository.findOne(fileID)),
            )
        ).filter((file) => file);

        // Google Storage 삭제
        const deleteFiles = await this.gStorageService.delete(dbFiles);

        // DB에도 삭제
        const results = await this.fileRepository.softDelete(fileIDs);

        return results.map((result) => {
            return result.affected ? true : false;
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
