import * as sharp from 'sharp';
import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';

import { FILE_TYPE } from './entities/type.enum';
import { FileEntity } from './entities/file.entity';
import { UploadResult } from './dto/uploadResult.dto';

@Injectable()
export class GoogleStorageSerivce {
    constructor() {}

    private readonly key = `./key/${process.env.FILE_KEY}`;

    /**
     * GCP Storage Upload
     */
    async upload(
        type: FILE_TYPE, //
        files: FileUpload[],
    ): Promise<Array<UploadResult>> {
        // 구글 Storage 연결
        const storage = new Storage({
            projectId: process.env.FILE_PROJECT_ID,
            keyFilename: this.key,
        }).bucket(process.env.FILE_BUCKET);

        // 업로드
        const storageUpload = (await Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    // 확장자 분리
                    const [_, prefix, suffix, ...__] = file.filename
                        .toLowerCase()
                        .match(/^(.+).(png|jpe?g|gif|webp)$/);

                    // 이름 Hashing
                    const name = `${v4()}.${suffix}`;
                    const path = `${type.toLowerCase()}/origin/`;
                    const url = `${path}${name}`;

                    file.createReadStream()
                        .pipe(storage.file(url).createWriteStream())
                        .on('finish', () => {
                            resolve({
                                name: name,
                                path: path,
                                url: url,
                            });
                        })
                        .on('error', (e) => reject(null));
                });
            }),
        )) as Array<UploadResult>;

        return storageUpload.filter((v) => v !== null);
    }

    /**
     * GCP Storage Upload With Thumb
     */
    async uploadThumb(
        type: FILE_TYPE, //
        files: FileUpload[],
    ): Promise<Array<UploadResult>> {
        // 구글 Storage 연결
        const storage = new Storage({
            projectId: process.env.FILE_PROJECT_ID,
            keyFilename: this.key,
        }).bucket(process.env.FILE_BUCKET);

        const configs = [
            { size: 0, path: 'origin/' },
            { size: 320, path: 'thumb/s/' },
            { size: 640, path: 'thumb/m/' },
            { size: 1280, path: 'thumb/l/' },
        ];

        const result = await Promise.all(
            files.map(async (file) => {
                // 확장자 분리
                const [_, prefix, suffix, ...__] = file.filename
                    .toLowerCase()
                    .match(/^(.+).(png|jpe?g|gif|webp)$/);
                const name = `${v4()}.${suffix}`;

                return (await Promise.all(
                    configs.map((c) => {
                        return new Promise((resolve, reject) => {
                            const path = `${type.toLowerCase()}/${c.path}`;
                            const url = `${path}${name}`;

                            const resizeStream =
                                c.size === 0
                                    ? file.createReadStream()
                                    : file
                                          .createReadStream()
                                          .pipe(sharp().resize(c.size));

                            resizeStream
                                .pipe(storage.file(url).createWriteStream())
                                .on('finish', () =>
                                    resolve({
                                        name: name,
                                        path: path,
                                        url: url,
                                    }),
                                )
                                .on('error', (e) => reject(null));
                        });
                    }),
                )) as UploadResult[];
            }),
        );

        return result.reduce((acc, cur) => {
            if (cur !== null) {
                return acc;
            } else {
                return [...acc, ...cur];
            }
        });
    }

    /**
     * GCP Storage Delete
     */
    async delete(
        files: Array<FileEntity>, //
    ): Promise<Array<string>> {
        const key = `./key/${process.env.FILE_KEY}`;

        // 구글 Storage 연결
        const storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: key,
        }).bucket(process.env.FILE_BUCKET);

        // 구글 삭제
        return (
            (await Promise.all(
                files.map((file) => {
                    return new Promise((resolve, reject) => {
                        storage.file(`${file.url}`).delete((e) => {
                            if (e) {
                                reject(null);
                            } else {
                                resolve(file.id);
                            }
                        });
                    });
                }),
            )) as Array<string>
        ).filter((file) => file !== null);
    }
}
