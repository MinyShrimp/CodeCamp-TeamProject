///////////////////////////////////////////////////////////////////////////
// NestJS //
import {
    Module,
    CacheModule,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common';

// GraphQL //
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

// TypeORM //
import { TypeOrmModule } from '@nestjs/typeorm';

// Redis //
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

// Config //
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

// Modules //
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/user/user.module';
import { EmailModule } from './apis/email/email.module';
import { PhoneModule } from './apis/phone/phone.module';
import { UserLikeModule } from './apis/userLike/userLike.module';
import { UserBlockModule } from './apis/userBlock/userBlock.module';
import { UserClassModule } from './apis/userClass/userClass.module';

import { ProductModule } from './apis/product/product.module';
import { PaymentModule } from './apis/payment/payment.module';
import { PaymentStatusModule } from './apis/paymentStatus/paymentStatus.module';

import { EventModule } from './apis/event/event.module';
import { NoticeModule } from './apis/notice/notice.module';
import { BoardModule } from './apis/board/board.module';
import { CommentModule } from './apis/comment/comment.module';

import { AnswerModule } from './apis/answer/answer.module';
import { QuestionModule } from './apis/question/question.module';

import { NovelModule } from './apis/novel/novel.module';
import { NovelTagModule } from './apis/novelTag/novelTag.module';
import { NovelIndexModule } from './apis/novelIndex/novelIndex.module';
import { NovelReviewModule } from './apis/novelReview/novelReview.module';
import { NovelCategoryModule } from './apis/novelCategory/novelCategory.module';
import { NovelIndexReviewModule } from './apis/novelIndexReview/novelIndexReview.module';

import { BookmarkModule } from './apis/bookmark/bookmark.module';
import { NovelLikeModule } from './apis/novelLike/novelLike.module';
import { NovelDonateModule } from './apis/novelDonate/novelDonate.module';

import { PaymentPointModule } from './apis/paymentPoint/paymentPoint.module';
import { PaymentPointStatusModule } from './apis/paymentPointStatus/paymentPointStatus.module';

import { ReportModule } from './apis/report/report.module';
import { ReportEnumModule } from './apis/reportEnum/reportEnum.module';

import { FileModule } from './apis/file/file.module';
import { TempStorageModule } from './apis/tempStorage/tempStorage.module';
import { LoggerModule } from './apis/logger/logger.module';

///////////////////////////////////////////////////////////////////////////
@Module({
    imports: [
        ///////////////////////////////////////////////////////////////////////////
        // Enviroment Config //
        // 최상단에 위치
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),

        ///////////////////////////////////////////////////////////////////////////
        // GrapthQL //

        // prettier-ignore
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => {
                return { req, res };
            },
            cors: {
                origin: [
                    'http://localhost:8080',
                    'http://localhost:3000', //
                ], // FE가 배포하면 FE 주소를 여기에 넣어야함
                credentials: 'include',
                exposedHeaders: ['Authorization', 'Set-Cookie', 'Cookie'],
                methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            },
            playground: process.env.MODE !== 'PRODUCTION',
        }),

        ///////////////////////////////////////////////////////////////////////////
        // TypeORM //
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: `${process.env.MYSQL_HOST}`,
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [
                __dirname + '/apis/**/*.entity.*', //
            ],

            charset: 'utf8mb4',
            collaction: 'utf8mb4_general_ci',
            synchronize: true,
            // logging: true,
        }),

        ///////////////////////////////////////////////////////////////////////////
        // Redis //
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            url: `redis://${process.env.REDIS_HOST}:6379`,
            isGlobal: true,
        }),

        ///////////////////////////////////////////////////////////////////////////
        // Modules //
        AuthModule,
        UserModule,
        UserLikeModule,
        UserBlockModule,
        UserClassModule,
        PhoneModule,
        EmailModule,

        ProductModule,
        PaymentModule,
        PaymentStatusModule,

        AnswerModule,
        QuestionModule,

        EventModule,
        NoticeModule,
        BoardModule,
        CommentModule,

        NovelModule,
        NovelTagModule,
        NovelIndexModule,
        NovelReviewModule,
        NovelCategoryModule,
        NovelIndexReviewModule,

        BookmarkModule,
        NovelLikeModule,
        NovelDonateModule,

        PaymentPointModule,
        PaymentPointStatusModule,

        ReportModule,
        ReportEnumModule,

        FileModule,
        TempStorageModule,

        LoggerModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
