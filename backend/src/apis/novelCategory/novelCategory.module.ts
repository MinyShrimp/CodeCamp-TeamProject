import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelCategoryEntity } from './entities/novelCategory.entity';
import { NovelCategoryRepository } from './entities/novelCategory.repository';

import { NovelCategoryCheckService } from './novelCategoryCheck.service';
import { NovelCategoryAdminController } from './novelCategory.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelCategoryEntity, //
        ]),
    ],
    exports: [
        NovelCategoryRepository, //
        NovelCategoryCheckService,
    ],
    controllers: [
        NovelCategoryAdminController, //
    ],
    providers: [
        NovelCategoryRepository, //
        NovelCategoryCheckService,
    ],
})
export class NovelCategoryModule {}
