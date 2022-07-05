import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserLikeEntity } from './entities/userLike.entity';
import { UserLikeAdminRepository } from './entities/userLike.admin.repository';

import { UserLikeAdminController } from './userLike.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserLikeEntity, //
        ]),
    ],
    controllers: [
        UserLikeAdminController, //
    ],
    providers: [
        UserLikeAdminRepository, //
    ],
})
export class UserLikeModule {}
