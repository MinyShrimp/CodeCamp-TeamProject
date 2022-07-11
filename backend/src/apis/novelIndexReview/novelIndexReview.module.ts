import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelIndexReviewEntity } from './entities/novelIndexReview.entity';
import { NovelIndexReviewService } from './novelIndexReview.service';
import { NovelIndexReviewResolver } from './novelIndexReview.resolver';
import { NovelIndexReviewRepository } from './entities/novelIndexReview.repository';
import { NovelIndexReviewAdminController } from './novelIndexReview.admin.controller';
import { NovelIndexReviewAdminRepository } from './entities/novelIndexReview.admin.repository';
import { NovelIndexEntity } from '../novelIndex/entities/novelIndex.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { NovelIndexModule } from '../novelIndex/novelIndex.module';
import { UserRepository } from '../user/entities/user.repository';
import { NovelIndexRepository } from '../novelIndex/entities/novelIndex.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            NovelIndexEntity,
            NovelIndexReviewEntity, //
        ]),
        UserModule,
        NovelIndexModule,
    ],
    controllers: [
        NovelIndexReviewAdminController, //
    ],
    providers: [
        UserRepository,
        NovelIndexRepository,
        NovelIndexReviewService,
        NovelIndexReviewResolver,
        NovelIndexReviewRepository,
        NovelIndexReviewAdminRepository, //
    ],
})
export class NovelIndexReviewModule {}
