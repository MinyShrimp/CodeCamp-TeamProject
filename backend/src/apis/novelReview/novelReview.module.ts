import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelReviewEntity } from './entities/novelReview.entity';
import { NovelReviewAdminRepository } from './entities/novelReview.admin.repository';

import { NovelReviewAdminController } from './novelReview.admin.controller';
import { NovelReviewResolver } from './novelReview.resolver';
import { NovelReviewService } from './novelReview.service';
import { UserRepository } from '../user/entities/user.repository';
import { UserModule } from '../user/user.module';
import { NovelReviewRepository } from './entities/novelReview.repository';
import { NovelRepository } from '../novel/entities/novel.repository';
import { NovelModule } from '../novel/novel.module';
import { NovelEntity } from '../novel/entities/novel.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelReviewEntity, //
            NovelEntity,
        ]),
        UserModule,
        NovelModule,
    ],
    controllers: [
        NovelReviewAdminController, //
    ],
    providers: [
        NovelReviewAdminRepository, //
        NovelReviewRepository,
        NovelReviewResolver,
        NovelReviewService,
        NovelRepository,
    ],
})
export class NovelReviewModule {}
