///////////////////////////////////////////////////////////////////////////
// NestJS //
import { Module, CacheModule } from '@nestjs/common';

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
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => {
                return { req, res };
            },
            cors: {
                origin: [process.env.FE_URL],
                credentials: 'include',
                exposedHeaders: ['Authorization', 'Set-Cookie'],
            },
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
            logging: true,
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
        PhoneModule,
        EmailModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
