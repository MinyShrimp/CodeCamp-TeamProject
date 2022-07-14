import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { NovelModule } from '../novel/novel.module';

import { NovelLikeEntity } from './entities/novelLike.entity';
import { NovelLikeRepository } from './entities/novelLike.repository';
import { NovelLikeAdminRepository } from './entities/novelLike.admin.repository';

import { NovelLikeService } from './novelLike.service';
import { NovelLikeResolver } from './novelLike.resolver';
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

        NovelLikeService,
        NovelLikeResolver,
        NovelLikeRepository,
    ],
})
export class NovelLikeModule {}
