import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelIndexReviewEntity } from './entities/novelIndexReview.entity';
import { NovelIndexReviewAdminRepository } from './entities/novelIndexReview.admin.repository';

import { NovelIndexReviewAdminController } from './novelIndexReview.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelIndexReviewEntity, //
        ]),
    ],
    controllers: [
        NovelIndexReviewAdminController, //
    ],
    providers: [
        NovelIndexReviewAdminRepository, //
    ],
})
export class NovelIndexReviewModule {}
