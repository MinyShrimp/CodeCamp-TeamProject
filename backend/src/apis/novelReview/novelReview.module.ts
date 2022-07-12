import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { NovelModule } from '../novel/novel.module';
import { NovelEntity } from '../novel/entities/novel.entity';
import { NovelRepository } from '../novel/entities/novel.repository';

import { NovelReviewEntity } from './entities/novelReview.entity';
import { NovelReviewService } from './novelReview.service';
import { NovelReviewResolver } from './novelReview.resolver';
import { NovelReviewRepository } from './entities/novelReview.repository';
import { NovelReviewAdminController } from './novelReview.admin.controller';
import { NovelReviewAdminRepository } from './entities/novelReview.admin.repository';

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
