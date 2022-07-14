import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';

import { UserBlockEntity } from './entities/userBlock.entity';
import { UserBlockRepository } from './entities/userBlock.reporsitory';
import { UserBlockAdminRepository } from './entities/userBlock.admin.repository';

import { UserBlockService } from './userBlock.service';
import { UserBlockResolver } from './userBlock.resolver';
import { UserBlockAdminController } from './userBlock.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserBlockEntity, //
        ]),
        UserModule,
    ],
    controllers: [
        UserBlockAdminController, //
    ],
    providers: [
        UserBlockAdminRepository, //

        UserBlockService,
        UserBlockResolver,
        UserBlockRepository,
    ],
})
export class UserBlockModule {}
