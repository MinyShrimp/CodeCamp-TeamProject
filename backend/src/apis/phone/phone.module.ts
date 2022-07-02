import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from './entities/phone.entity';
import { PhoneRepository } from './entities/phone.repository';
import { PhoneAdminRepository } from './entities/phone.repository.admin';
import { PhoneAdminController } from './phone.controller.admin';
import { PhoneRedis } from './phone.redis';
import { PhoneResolver } from './phone.resolver';
import { PhoneService } from './phone.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PhoneEntity, //
        ]),
    ],
    exports: [
        PhoneRepository, //
        PhoneService,
        PhoneRedis,
    ],
    controllers: [PhoneAdminController],
    providers: [
        PhoneAdminRepository,

        PhoneRepository, //
        PhoneService,
        PhoneResolver,
        PhoneRedis,
    ],
})
export class PhoneModule {}
