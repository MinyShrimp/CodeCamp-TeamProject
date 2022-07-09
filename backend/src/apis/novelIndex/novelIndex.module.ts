import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelModule } from '../novel/novel.module';

import { NovelIndexEntity } from './entities/novelIndex.entity';
import { NovelIndexRepository } from './entities/novelIndex.repository';
import { NovelIndexAdminRepository } from './entities/novelIndex.admin.repository';

import { NovelIndexService } from './novelIndex.service';
import { NovelIndexResolver } from './novelIndex.resolver';
import { NovelIndexAdminController } from './novelIndex.admin.controller';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelIndexEntity, //
        ]),

        UserModule,
        NovelModule,
    ],
    exports: [
        NovelIndexService, //
    ],
    controllers: [
        NovelIndexAdminController, //
    ],
    providers: [
        NovelIndexAdminRepository, //

        NovelIndexService,
        NovelIndexResolver,
        NovelIndexRepository,
    ],
})
export class NovelIndexModule {}
