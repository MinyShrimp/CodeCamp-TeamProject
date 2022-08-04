import * as morgan from 'morgan';
const morgan_json = require('morgan-json');
import { Request } from 'express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';

import { AppModule } from './app.module';

import { setupSwagger } from './commons/utils/swaggerSetup.util';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';

import {
    createLogger,
    ConsoleLoggerStream,
    ResponseLoggerStream,
} from './commons/logger/winston.config';
import { AppLoggerService } from './commons/logger/logger.service';

export const origins =
    process.env.MODE === 'PRODUCTION'
        ? [process.env.FE_URL, 'http://localhost:3000']
        : [process.env.FE_URL, process.env.AD_URL];

async function bootstrap() {
    createLogger();

    const app = await NestFactory.create(AppModule, {
        logger: new AppLoggerService(),
    });

    ///////////////////////////////////////////////////////////////////////////

    // prettier-ignore
    app.enableCors({
        origin: origins,
        credentials: true,
        exposedHeaders: ['Authorization', 'Set-Cookie', 'Cookie'],
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(graphqlUploadExpress());

    morgan.token('operationName', (req: Request) => {
        if (req.body) {
            if (req.body.operationName) {
                return req.body.operationName;
            }
        }
        return '-';
    });

    app.use(
        morgan(
            morgan_json(
                ':date[iso] :remote-addr :remote-user :method :url :operationName :http-version :status :res[content-length] :response-time :referrer :user-agent',
                { stringify: true },
            ),
            {
                stream: ResponseLoggerStream,
                skip: (req: Request) => {
                    if (req.body) {
                        if (req.body.operationName) {
                            return (
                                req.body.operationName === 'IntrospectionQuery'
                            );
                        }
                    }
                    return false;
                },
            },
        ),
    );
    app.use(
        morgan(
            ':remote-addr - :remote-user ":method :url :operationName HTTP/:http-version" :status (:response-time ms)',
            {
                stream: ConsoleLoggerStream,
                skip: (req: Request) => {
                    if (req.body) {
                        if (req.body.operationName) {
                            return (
                                req.body.operationName === 'IntrospectionQuery'
                            );
                        }
                    }
                    return false;
                },
            },
        ),
    );

    setupSwagger(app);
    ///////////////////////////////////////////////////////////////////////////
    await app.listen(3000);
}
bootstrap();
