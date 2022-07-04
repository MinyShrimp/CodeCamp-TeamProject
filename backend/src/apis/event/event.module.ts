import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventEntity } from './entities/event.entity';
import { EventAdminRepository } from './entities/event.admin.repository';

import { EventAdminController } from './event.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EventEntity, //
        ]),
    ],
    controllers: [
        EventAdminController, //
    ],
    providers: [
        EventAdminRepository, //
    ],
})
export class EventModule {}
