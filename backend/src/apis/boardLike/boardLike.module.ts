import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { BoardModule } from '../board/board.module';
import { BoardEntity } from '../board/entities/board.entity';
import { BoardService } from '../board/board.service';
import { BoardRepository } from '../board/entities/board.repository';

import { BoardLikeEntity } from './entities/boardLike.entity';
import { BoardLikeService } from './boardLike.service';
import { BoardLikeResolver } from './boardLike.resolver';
import { BoardLikeRepository } from './entities/boardLike.repository';
import { BoardLikeAdminController } from './boardLike.admin.controller';
import { BoardLikeAdminRepository } from './entities/boardLike.admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BoardLikeEntity, //
            BoardEntity,
        ]),
        BoardModule,
        UserModule,
        FileModule,
    ],
    controllers: [
        BoardLikeAdminController, //
    ],
    providers: [
        BoardLikeAdminRepository, //

        BoardLikeRepository,
        BoardLikeResolver,
        BoardLikeService,
        BoardRepository,
        BoardService,
    ],
})
export class BoardLikeModule {}
