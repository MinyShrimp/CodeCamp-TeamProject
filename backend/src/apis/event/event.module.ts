import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { FileEntity } from '../file/entities/file.entity';
import { FileModule } from '../file/file.module';
import { UserRepository } from '../user/entities/user.repository';
import { FileRepository } from '../file/entities/file.repository';

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
            FileEntity,
        ]),
        UserModule,
        FileModule,
    ],
    controllers: [
        EventAdminController, //
    ],
    providers: [
        EventAdminRepository, //
        EventRepository,
        FileRepository,
        UserRepository,
        EventResolver,
        EventService,
    ],
})
export class EventModule {}
