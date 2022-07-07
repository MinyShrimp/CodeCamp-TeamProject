import sharp from 'sharp';
import { v4 } from 'uuid';
import fileUpload from 'express-fileupload';
import { IImage } from './interface';
import { existsSync, mkdirSync } from 'fs';

export function getImageSuffix(
    name: string, //
): string {
    const match = name.match(
        /.(png|svg|jpe?g|ico|bmp|rle|dib|gif|tiff?|raw|psd|pdd)$/,
    );

    if (match === null) {
        throw '지원하지 않는 확장자입니다.';
    }

    const [suffix, ..._] = match;
    return suffix;
}

export function saveImage(
    file: fileUpload.UploadedFile, //
    path: string = '', //
): IImage {
    const suffix = getImageSuffix(file.name);
    const fileName = v4();

    const url = `/img/${path}origin/${fileName}${suffix}`;
    file.mv(`./resource${url}`);

    return {
        name: fileName + suffix,
        url: url,
        size: file.size,
        mimetype: file.mimetype,
    };
}

export async function makeThumbs(
    file: fileUpload.UploadedFile, //
    path: string = '', //
): Promise<IImage[]> {
    const origin = saveImage(file, path);
    const [fileName, suffix] = origin.name.split('.');

    const configs = [
        { size: 320, path: 'thumb/s/' },
        { size: 640, path: 'thumb/m/' },
        { size: 1280, path: 'thumb/l/' },
    ];

    const thumbs = (await Promise.all(
        configs.map((config) => {
            return new Promise(async (resolve, reject) => {
                const dir = `/img/${path}${config.path}`;
                const url = `${dir}${fileName}_${config.size}.${suffix}`;

                try {
                    if (!existsSync(`./resource${dir}`)) {
                        mkdirSync(`./resource${dir}`, { recursive: true });
                    }

                    const res = await sharp(file.data)
                        .resize({ width: config.size })
                        .toFile(`./resource${url}`);

                    resolve({
                        name: `${fileName}_${config.size}.${suffix}`,
                        url: url,
                        size: res.size,
                        mimetype: 'image/' + res.format,
                    });
                } catch (e) {
                    reject(e);
                }
            });
        }),
    )) as IImage[];

    return [origin, ...thumbs];
}
