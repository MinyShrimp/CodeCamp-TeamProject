import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as path from 'path';

@Injectable()
export class AdminRouteMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const url = req.url;
        const urlSplit = url.split('/');

        if (urlSplit[1] === 'admin') {
            const _path = path.join(
                __dirname,
                '..',
                '..',
                '..',
                'admin',
                urlSplit[2] === 'static' ? urlSplit[3] : 'index.html',
            );
            res.sendFile(_path);
        } else {
            next();
        }
    }
}
