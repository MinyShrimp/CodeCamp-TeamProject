## install

```
yarn add @nestjs/config
yarn add @nestjs/typeorm typeorm@0.2 mysql2
yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
yarn add class-validator class-transformer

yarn add bcryptjs
yarn add @types/bcryptjs --dev

yarn add @nestjs/jwt passport-jwt @nestjs/passport passport
yarn add @types/passport-jwt --dev

yarn add passport-google-oauth20 passport-kakao passport-naver
yarn add @types/passport-naver @types/passport-kakao @types/passport-google-oauth20 --dev

yarn add axios
yarn add @types/axios --dev

yarn add @google-cloud/storage@6.1.0 @google-cloud/bigquery
yarn add graphql-upload
yarn add @types/graphql-upload --dev

yarn add cache-manager cache-manager-redis-store redis
yarn add @types/cache-manager @types/cache-manager-redis-store --dev

yarn add @nestjs/elasticsearch @elastic/elasticsearch

yarn add nodemailer coolsms-node-sdk
yarn add -D @types/nodemailer
```

## 설정

```typescript
///////////////////////////////////////////////////////////////////////////
// NestJS //
import { Module } from "@nestjs/common";

// GraphQL //
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";

// TypeORM //
import { TypeOrmModule } from "@nestjs/typeorm";

// Config //
import { ConfigModule } from "@nestjs/config";

///////////////////////////////////////////////////////////////////////////
@Module({
    imports: [
        ///////////////////////////////////////////////////////////////////////////
        // Enviroment Config //
        // 최상단에 위치
        ConfigModule.forRoot({
            envFilePath: ".env",
        }),

        ///////////////////////////////////////////////////////////////////////////
        // GrapthQL //
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: "src/commons/graphql/schema.gql",
        }),

        ///////////////////////////////////////////////////////////////////////////
        // TypeORM //
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [__dirname + "/apis/**/*.entity.ts"],
            synchronize: true,
            logging: true,
        }),
        ///////////////////////////////////////////////////////////////////////////
        // Modules //
    ],
    controllers: [],
    providers: [],
})
```

```typescript
/* main.ts */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
```

## 깃 이모지 추가

```
npm i -g gitmogi-cli
git add .
gitmoji -c
git push origin main
```
