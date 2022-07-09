import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { NovelTagModule } from '../novelTag/novelTag.module';
import { NovelCategoryModule } from '../novelCategory/novelCategory.module';

import { NovelEntity } from './entities/novel.entity';
import { NovelRepository } from './entities/novel.repository';
import { NovelAdminRepository } from './entities/novel.admin.repository';

import { NovelService } from './novel.service';
import { NovelResolver } from './novel.resolver';
import { NovelAdminController } from './novel.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelEntity, //
        ]),

        UserModule,
        NovelTagModule,
        NovelCategoryModule,
    ],
    controllers: [
        NovelAdminController, //
    ],
    providers: [
        NovelAdminRepository, //

        NovelService,
        NovelResolver,
        NovelRepository,
    ],
})
export class NovelModule {}
