import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardLikeEntity } from './entities/boardLike.entity';
import { BoardLikeAdminRepository } from './entities/boardLike.admin.repository';

import { BoardLikeAdminController } from './boardLike.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BoardLikeEntity, //
        ]),
    ],
    controllers: [
        BoardLikeAdminController, //
    ],
    providers: [
        BoardLikeAdminRepository, //
    ],
})
export class BoardLikeModule {}
