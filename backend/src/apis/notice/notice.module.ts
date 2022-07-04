import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NoticeEntity } from './entities/notice.entity';
import { NoticeAdminRepository } from './entities/notice.admin.repository';

import { NoticeAdminController } from './notice.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NoticeEntity, //
        ]),
    ],
    controllers: [
        NoticeAdminController, //
    ],
    providers: [
        NoticeAdminRepository, //
    ],
})
export class NoticeModule {}
