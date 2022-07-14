import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/entities/user.repository';

import { NoticeEntity } from './entities/notice.entity';
import { NoticeService } from './notice.service';
import { NoticeResolver } from './notice.resolver';
import { NoticeRepository } from './entities/notice.repository';
import { NoticeAdminController } from './notice.admin.controller';
import { NoticeAdminRepository } from './entities/notice.admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NoticeEntity, //
            UserEntity,
        ]),
        UserModule,
    ],
    controllers: [
        NoticeAdminController, //
    ],
    providers: [
        NoticeAdminRepository, //
        NoticeRepository,
        UserRepository,
        NoticeResolver,
        NoticeService,
    ],
})
export class NoticeModule {}
