import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/entities/user.repository';

import { EventEntity } from './entities/event.entity';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { EventRepository } from './entities/event.repository';
import { EventAdminController } from './event.admin.controller';
import { EventAdminRepository } from './entities/event.admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EventEntity, //
            UserEntity,
        ]),
        UserModule,
    ],
    controllers: [
        EventAdminController, //
    ],
    providers: [
        EventAdminRepository, //
        EventRepository,
        UserRepository,
        EventResolver,
        EventService,
    ],
})
export class EventModule {}
