import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentEntity } from './entities/comment.entity';
import { CommentAdminRepository } from './entities/comment.admin.repository';

import { CommentAdminController } from './comment.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentEntity, //
        ]),
    ],
    controllers: [
        CommentAdminController, //
    ],
    providers: [
        CommentAdminRepository, //
    ],
})
export class CommentModule {}
