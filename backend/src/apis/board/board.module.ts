import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardEntity } from './entities/board.entity';
import { BoardAdminRepository } from './entities/board.admin.repository';

import { BoardAdminController } from './board.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BoardEntity, //
        ]),
    ],
    controllers: [
        BoardAdminController, //
    ],
    providers: [
        BoardAdminRepository, //
    ],
})
export class BoardModule {}
