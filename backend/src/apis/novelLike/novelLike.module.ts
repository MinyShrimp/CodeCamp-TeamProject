import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelLikeEntity } from './entities/novelLike.entity';
import { NovelLikeAdminRepository } from './entities/novelLike.admin.repository';

import { NovelLikeAdminController } from './novelLike.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelLikeEntity, //
        ]),
    ],
    controllers: [
        NovelLikeAdminController, //
    ],
    providers: [
        NovelLikeAdminRepository, //
    ],
})
export class NovelLikeModule {}
