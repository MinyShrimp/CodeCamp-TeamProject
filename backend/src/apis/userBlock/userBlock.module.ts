import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserBlockEntity } from './entities/userBlock.entity';
import { UserBlockAdminRepository } from './entities/userBlock.admin.repository';

import { UserBlockAdminController } from './userBlock.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserBlockEntity, //
        ]),
    ],
    controllers: [
        UserBlockAdminController, //
    ],
    providers: [
        UserBlockAdminRepository, //
    ],
})
export class UserBlockModule {}
