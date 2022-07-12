import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { setupSwagger } from './commons/utils/swaggerSetup.util';
import { AppLoggerService } from './logger.service';
import { createLogger } from './winston.config';

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

    setupSwagger(app);
    ///////////////////////////////////////////////////////////////////////////
    await app.listen(3000);
}
bootstrap();
