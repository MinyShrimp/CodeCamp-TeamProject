import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { NovelModule } from '../novel/novel.module';

import { NovelLikeEntity } from './entities/novelLike.entity';
import { NovelLikeAdminRepository } from './entities/novelLike.admin.repository';

import { NovelLikeAdminController } from './novelLike.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelLikeEntity, //
        ]),
        UserModule,
        NovelModule,
    ],
    controllers: [
        NovelLikeAdminController, //
    ],
    providers: [
        NovelLikeAdminRepository, //
    ],
})
export class NovelLikeModule {}
