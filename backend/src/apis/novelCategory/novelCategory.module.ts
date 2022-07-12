import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelCategoryEntity } from './entities/novelCategory.entity';
import { NovelCategoryRepository } from './entities/novelCategory.repository';
import { NovelCategoryAdminRepository } from './entities/novelCategory.admin.repository';

import { NovelCategoryService } from './novelCategory.service';
import { NovelCategoryAdminController } from './novelCategory.admin.controller';
import { NovelCategoryResolver } from './novelCategory.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelCategoryEntity, //
        ]),
    ],
    exports: [
        NovelCategoryService, //
    ],
    controllers: [
        NovelCategoryAdminController, //
    ],
    providers: [
        NovelCategoryAdminRepository, //

        NovelCategoryService,
        NovelCategoryResolver,
        NovelCategoryRepository,
    ],
})
export class NovelCategoryModule {}
