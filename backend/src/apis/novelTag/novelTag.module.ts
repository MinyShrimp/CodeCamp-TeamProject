import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelTagEntity } from './entities/novelTag.entity';
import { NovelTagAdminRepository } from './entities/novelTag.admin.repository';

import { NovelTagAdminController } from './novelTag.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelTagEntity, //
        ]),
    ],
    controllers: [
        NovelTagAdminController, //
    ],
    providers: [
        NovelTagAdminRepository, //
    ],
})
export class NovelTagModule {}
