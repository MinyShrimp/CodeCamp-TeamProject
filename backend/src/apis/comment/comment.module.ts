import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { BoardModule } from '../board/board.module';
import { BoardEntity } from '../board/entities/board.entity';
import { UserRepository } from '../user/entities/user.repository';
import { BoardRepository } from '../board/entities/board.repository';

import { CommentEntity } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CommentRepository } from './entities/comment.repository';
import { CommentAdminController } from './comment.admin.controller';
import { CommentAdminRepository } from './entities/comment.admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentEntity, //
            BoardEntity,
            UserEntity,
        ]),
        UserModule,
        BoardModule,
    ],
    controllers: [
        CommentAdminController, //
    ],
    providers: [
        CommentAdminRepository, //
        CommentRepository,
        CommentResolver,
        BoardRepository,
        CommentService,
        UserRepository,
    ],
})
export class CommentModule {}
