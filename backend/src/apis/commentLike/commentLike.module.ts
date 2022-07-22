import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentLikeEntity } from './entities/commentLike.entity';
import { CommentLikeService } from './commentLike.service';
import { CommentLikeResolver } from './commentLike.resolver';
import { CommentLikeRepository } from './entities/commentLike.repository';
import { CommentLikeAdminController } from './commentLike.admin.controller';
import { CommentLikeAdminRepository } from './entities/commentLike.admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentLikeEntity, //
        ]),
    ],
    controllers: [
        CommentLikeAdminController, //
    ],
    providers: [
        CommentLikeAdminRepository, //
        CommentLikeRepository,
        CommentLikeResolver,
        CommentLikeService,
    ],
})
export class CommentLikeModule {}
