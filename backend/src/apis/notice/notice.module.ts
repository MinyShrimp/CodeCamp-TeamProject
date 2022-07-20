import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/entities/user.repository';

import { FileModule } from '../file/file.module';
import { FileEntity } from '../file/entities/file.entity';
import { NoticeEntity } from './entities/notice.entity';
import { NoticeService } from './notice.service';
import { NoticeResolver } from './notice.resolver';
import { FileRepository } from '../file/entities/file.repository';
import { NoticeRepository } from './entities/notice.repository';
import { NoticeAdminController } from './notice.admin.controller';
import { NoticeAdminRepository } from './entities/notice.admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NoticeEntity, //
            UserEntity,
            FileEntity,
        ]),
        UserModule,
        FileModule,
    ],
    controllers: [
        NoticeAdminController, //
    ],
    providers: [
        NoticeAdminRepository, //
        NoticeRepository,
        UserRepository,
        FileRepository,
        NoticeResolver,
        NoticeService,
    ],
})
export class NoticeModule {}
