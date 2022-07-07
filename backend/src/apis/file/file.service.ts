import { Injectable } from '@nestjs/common';

import { FileUpload } from 'graphql-upload';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';

import { FileEntity } from './entities/file.entity';
import { GoogleStorageSerivce } from './gStorage.service';
import { FileRepository } from './entities/file.repository';

@Injectable()
export class FileService {
    constructor(
        private readonly fileRepository: FileRepository,
        private readonly gStorageService: GoogleStorageSerivce,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

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
        // Google Storage 업로드
        const db_files = [];
        const tmps = await this.gStorageService.upload(folderName, files);

        // DB Table에 추가
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
    // 삭제 //

    /**
     * 삭제 ( Soft )
     * @param fileIDs
     * @returns ResultMessage
     */
    async softDelete(
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
}
