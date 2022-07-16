import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { NovelModule } from '../novel/novel.module';

import { NovelIndexEntity } from './entities/novelIndex.entity';
import { NovelIndexRepository } from './entities/novelIndex.repository';
import { NovelIndexAdminRepository } from './entities/novelIndex.admin.repository';

import { NovelIndexService } from './novelIndex.service';
import { NovelIndexResolver } from './novelIndex.resolver';
import { NovelIndexViewCountRedis } from './novelIndex.redis.viewCount';
import { NovelIndexAdminController } from './novelIndex.admin.controller';

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
        NovelIndexViewCountRedis,
    ],
    controllers: [
        NovelIndexAdminController, //
    ],
    providers: [
        NovelIndexAdminRepository, //

        NovelIndexService,
        NovelIndexResolver,
        NovelIndexRepository,
        NovelIndexViewCountRedis,
    ],
})
export class NovelIndexModule {}
