import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardEntity } from './entities/board.entity';
import { BoardAdminRepository } from './entities/board.admin.repository';

import { BoardAdminController } from './board.admin.controller';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { BoardRepository } from './entities/board.repository';
import { UserEntity } from '../user/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BoardEntity, //
            UserEntity,
        ]),
    ],
    controllers: [
        BoardAdminController, //
    ],
    providers: [
        BoardAdminRepository, //
        BoardRepository,
        BoardResolver,
        BoardService,
    ],
})
export class BoardModule {}
