import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { BoardModule } from '../board/board.module';
import { BoardEntity } from '../board/entities/board.entity';
import { CommentModule } from '../comment/comment.module';
import { CommentEntity } from '../comment/entities/comment.entity';
import { CommentService } from '../comment/comment.service';
import { BoardRepository } from '../board/entities/board.repository';
import { CommentRepository } from '../comment/entities/comment.repository';

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
            CommentEntity,
            BoardEntity,
        ]),
        UserModule,
        BoardModule,
        CommentModule,
    ],
    controllers: [
        CommentLikeAdminController, //
    ],
    providers: [
        CommentLikeAdminRepository, //

        CommentLikeRepository,
        CommentLikeResolver,
        CommentLikeService,
        CommentRepository,
        BoardRepository,
        CommentService,
    ],
})
export class CommentLikeModule {}
