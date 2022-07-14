import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { IPayloadSub } from './commons/interfaces/Payload.interface';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('Request');

    use(req: Request, res: Response, next: NextFunction) {
        const name = req.body.operationName;
        if (name !== 'IntrospectionQuery') {
            const authorization = req.headers.authorization;

            try {
                if (/^Bearer .+$/.test(authorization)) {
                    const jwt = authorization.replace('Bearer ', '');
                    const payload = decode(jwt) as IPayloadSub;
                    this.logger.log(`${name} - ${payload.nickName}`);
                } else {
                    this.logger.log(`${name}`);
                }
            } catch (e) {
                this.logger.warn(`${name} - ${e.message} - ${authorization}`);
            }
        }

        next();
    }
}
