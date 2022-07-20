import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';
import { NovelTagModule } from '../novelTag/novelTag.module';
import { PaymentPointEntity } from '../paymentPoint/entities/paymentPoint.entity';
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
            PaymentPointEntity,
        ]),

        FileModule,
        UserModule,
        NovelTagModule,
        NovelCategoryModule,
    ],
    exports: [
        NovelService,
        NovelRepository, //
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
