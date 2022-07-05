import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelCategoryEntity } from './entities/novelCategory.entity';
import { NovelCategoryAdminRepository } from './entities/novelCategory.admin.repository';

import { NovelCategoryAdminController } from './novelCategory.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelCategoryEntity, //
        ]),
    ],
    controllers: [
        NovelCategoryAdminController, //
    ],
    providers: [
        NovelCategoryAdminRepository, //
    ],
})
export class NovelCategoryModule {}
