import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { FileEntity } from '../file/entities/file.entity';
import { FileRepository } from '../file/entities/file.repository';
import { UserCheckService } from '../user/userCheck.service';

import { BoardEntity } from './entities/board.entity';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { BoardRepository } from './entities/board.repository';
import { BoardAdminController } from './board.admin.controller';
import { BoardAdminRepository } from './entities/board.admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BoardEntity, //
            FileEntity,
        ]),
        UserModule,
        FileModule,
    ],
    controllers: [
        BoardAdminController, //
    ],
    providers: [
        BoardAdminRepository, //
        UserCheckService,
        BoardRepository,
        FileRepository,
        BoardResolver,
        BoardService,
    ],
})
export class BoardModule {}
