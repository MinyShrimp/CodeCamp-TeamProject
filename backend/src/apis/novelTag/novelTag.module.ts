import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelTagEntity } from './entities/novelTag.entity';
import { NovelTagRepository } from './entities/novelTag.repository';
import { NovelTagAdminRepository } from './entities/novelTag.admin.repository';

import { NovelTagService } from './novelTag.service';
import { NovelTagResolver } from './novelTag.resolver';
import { NovelTagAdminController } from './novelTag.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelTagEntity, //
        ]),
    ],
    exports: [
        NovelTagService, //
    ],
    controllers: [
        NovelTagAdminController, //
    ],
    providers: [
        NovelTagAdminRepository, //

        NovelTagService,
        NovelTagResolver,
        NovelTagRepository,
    ],
})
export class NovelTagModule {}
