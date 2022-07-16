import * as morgan from 'morgan';
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
} from './logger/winston.config';
import { AppLoggerService } from './logger/logger.service';

async function bootstrap() {
    createLogger();

    const app = await NestFactory.create(AppModule, {
        logger: new AppLoggerService(),
    });

    ///////////////////////////////////////////////////////////////////////////
    app.enableCors({
        origin: [
            'http://localhost:8080',
            'http://localhost:3000', //
        ], // FE가 배포하면 FE 주소를 여기에 넣어야함
        credentials: true,
        exposedHeaders: ['Authorization', 'Set-Cookie', 'Cookie'],
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
            ':remote-addr - :remote-user ":method :url :operationName HTTP/:http-version" :status :res[content-length] :response-time ":referrer" ":user-agent"',
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
            { stream: ConsoleLoggerStream },
        ),
    );

    setupSwagger(app);
    ///////////////////////////////////////////////////////////////////////////
    await app.listen(3000);
}
bootstrap();
