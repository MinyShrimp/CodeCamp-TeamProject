import * as fs from 'fs';
import { v4 } from 'uuid';
import * as FormData from 'form-data';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import axios, { Axios, AxiosResponse } from 'axios';

import { FILE_TYPE } from './entities/type.enum';

@Injectable()
export class MediaServerService {
    constructor() {}

    /**
     * Form Data 생성
     */
    async makeForm(
        type: FILE_TYPE,
        files: FileUpload[], //
    ): Promise<{ _axios: Axios; form: FormData; tmpFileNames: Array<String> }> {
        const writeFiles = await Promise.all(files);

        const form = new FormData();
        form.append('path', `${type}/`);

        const tmpFileNames = (
            (await Promise.all(
                writeFiles.map((file) => {
                    return new Promise((resolve, reject) => {
                        const fileName = v4();
                        const [suffix, ..._] =
                            file.filename.match(/.(png|svg|jpe?g)/);

                        file.createReadStream()
                            .pipe(
                                fs.createWriteStream(
                                    `./tmp/${fileName}${suffix}`,
                                ),
                            )
                            .on('finish', () => {
                                form.append(
                                    'uploadFile',
                                    fs.readFileSync(
                                        `./tmp/${fileName}${suffix}`,
                                    ),
                                    {
                                        filename: `${fileName}${suffix}`,
                                    },
                                );
                                resolve(`${fileName}${suffix}`);
                            })
                            .on('error', () => {
                                reject(null);
                            });
                    });
                }),
            )) as string[]
        ).filter((v) => v !== null);

        const _axios = axios.create({
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return { _axios, form, tmpFileNames };
    }

    /**
     * 업로드
     */
    async upload(
        type: FILE_TYPE,
        files: FileUpload[], //
    ) {
        const { _axios, form, tmpFileNames } = await this.makeForm(type, files);

        let res: AxiosResponse;
        try {
            res = await _axios.post(`${process.env.MD_URL}/img/upload`, form);
        } catch (e) {
            console.log(e.response.data);
        } finally {
            tmpFileNames.forEach((fileName) => {
                fs.unlinkSync(`./tmp/${fileName}`);
            });
        }

        return res.data.data;
    }

    /**
     * 썸네일 생성 업로드
     */
    async upload_thumb(
        type: FILE_TYPE,
        files: FileUpload[], //
    ) {
        const { _axios, form, tmpFileNames } = await this.makeForm(type, files);

        let res: AxiosResponse;
        try {
            res = await _axios.post(
                `${process.env.MD_URL}/img/upload-thumb`,
                form,
            );
        } catch (e) {
            console.log(e.response.data);
        } finally {
            tmpFileNames.forEach((fileName) => {
                fs.unlinkSync(`./tmp/${fileName}`);
            });
        }

        return res.data.data;
    }

    /**
     * 삭제
     */
    async delete(
        URLs: Array<string>, //
    ) {
        // 미디어 서버 파일 삭제
        const res = await axios.delete(`${process.env.MD_URL}/img/bulk`, {
            data: {
                urls: URLs,
            },
        });

        return res.data;
    }
}
