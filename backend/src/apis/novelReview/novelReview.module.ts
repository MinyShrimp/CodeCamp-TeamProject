import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelReviewEntity } from './entities/novelReview.entity';
import { NovelReviewAdminRepository } from './entities/novelReview.admin.repository';

import { NovelReviewAdminController } from './novelReview.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelReviewEntity, //
        ]),
    ],
    controllers: [
        NovelReviewAdminController, //
    ],
    providers: [
        NovelReviewAdminRepository, //
    ],
})
export class NovelReviewModule {}
