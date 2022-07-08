import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';

import { BoardEntity } from './entities/board.entity';
import { BoardAdminRepository } from './entities/board.admin.repository';

import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { BoardRepository } from './entities/board.repository';
import { BoardAdminController } from './board.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BoardEntity, //
        ]),
        UserModule,
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
