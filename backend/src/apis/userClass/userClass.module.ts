import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserClassEntity } from './entities/userClass.entity';
import { UserClassRepository } from './entities/userClass.repository';
import { UserClassAdminRepository } from './entities/userClass.admin.repository';

import { UserClassAdminController } from './userClass.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserClassEntity, //
        ]),
    ],
    exports: [
        UserClassRepository, //
    ],
    controllers: [
        UserClassAdminController, //
    ],
    providers: [
        UserClassAdminRepository, //
        UserClassRepository,
    ],
})
export class UserClassModule {}
