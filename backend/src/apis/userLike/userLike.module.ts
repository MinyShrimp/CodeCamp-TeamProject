import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';

import { UserLikeEntity } from './entities/userLike.entity';
import { UserLikeRepository } from './entities/userLike.repository';
import { UserLikeAdminRepository } from './entities/userLike.admin.repository';

import { UserLikeService } from './userLike.service';
import { UserLikeResolver } from './userLike.resolver';
import { UserLikeAdminController } from './userLike.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserLikeEntity, //
        ]),
        UserModule,
    ],
    controllers: [
        UserLikeAdminController, //
    ],
    providers: [
        UserLikeAdminRepository, //

        UserLikeService,
        UserLikeResolver,
        UserLikeRepository,
    ],
})
export class UserLikeModule {}
