import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelEntity } from './entities/novel.entity';
import { NovelAdminRepository } from './entities/novel.admin.repository';

import { NovelAdminController } from './novel.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelEntity, //
        ]),
    ],
    controllers: [
        NovelAdminController, //
    ],
    providers: [
        NovelAdminRepository, //
    ],
})
export class NovelModule {}
