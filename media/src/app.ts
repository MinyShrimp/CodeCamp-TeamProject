import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';

import { getImageSuffix, makeThumbs, saveImage } from './image/function';

///////////////////////////////////////////////////////////////
// Express 초기 세팅
const app = express();
app.use(
    cors({
        origin: ['localhost:3000', 'localhost:8081'],
    }),
);
app.use(
    fileUpload({
        abortOnLimit: true,
        responseOnLimit: '업로드 가능한 최대 파일 용량은 2MB입니다.',
        createParentPath: true,
        limits: {
            fileSize: 2 * 1024 * 1024, // 2MB max file(s) size
        },
    }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('resource'));

///////////////////////////////////////////////////////////////
// 이미지 업로드
const key = 'uploadFile';
app.post(
    '/img/upload',
    (req: Request, res: Response, next) => {
        try {
            if (!req.files) {
                throw '파일이 없습니다.';
            }

            const files = req.files[key];
            if (files === undefined) {
                throw '파일이 없습니다.';
            }

            Array.isArray(files)
                ? files.map((file) => getImageSuffix(file.name))
                : getImageSuffix(files.name);

            next();
        } catch (e) {
            res.status(400).send({
                status: false,
                message: e,
            });
        }
    },
    (req: Request, res: Response) => {
        try {
            const files = req.files[key];

            const datas = Array.isArray(files)
                ? files.map((file) => saveImage(file, req.body.path))
                : saveImage(files, req.body.path);

            res.send({
                status: true,
                message: '파일 업로드 성공',
                data: datas,
            });
        } catch (e) {
            res.status(500).send({
                status: false,
                message: e.message,
            });
        }
    },
);

app.post(
    '/img/upload-thumb',
    (req: Request, res: Response, next) => {
        try {
            if (!req.files) {
                throw '파일이 없습니다.';
            }

            const files = req.files[key];
            if (files === undefined) {
                throw '파일이 없습니다.';
            }

            Array.isArray(files)
                ? files.map((file) => getImageSuffix(file.name))
                : getImageSuffix(files.name);

            next();
        } catch (e) {
            res.status(400).send({
                status: false,
                message: e,
            });
        }
    },
    async (req: Request, res: Response) => {
        try {
            const files = req.files[key];

            const datas = Array.isArray(files)
                ? await Promise.all(
                      files.map(
                          async (file) => await makeThumbs(file, req.body.path),
                      ),
                  )
                : await makeThumbs(files, req.body.path);

            res.send({
                status: true,
                message: '파일 업로드 성공',
                data: datas,
            });
        } catch (e) {
            res.status(500).send({
                status: false,
                message: e.message,
            });
        }
    },
);

///////////////////////////////////////////////////////////////
// 서버 열기
app.listen(8500, '0.0.0.0', () => {
    console.log(`
################################################
🛡️  Server listening on port: 8500 🛡️
################################################`);
});
