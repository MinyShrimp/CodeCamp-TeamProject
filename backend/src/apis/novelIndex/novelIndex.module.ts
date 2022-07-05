import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelIndexEntity } from './entities/novelIndex.entity';
import { NovelIndexAdminRepository } from './entities/novelIndex.admin.repository';

import { NovelIndexAdminController } from './novelIndex.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelIndexEntity, //
        ]),
    ],
    controllers: [
        NovelIndexAdminController, //
    ],
    providers: [
        NovelIndexAdminRepository, //
    ],
})
export class NovelIndexModule {}
