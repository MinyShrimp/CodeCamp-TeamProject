import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NovelDonateEntity } from './entities/novelDonate.entity';
import { NovelDonateAdminRepository } from './entities/novelDonate.admin.repository';

import { NovelDonateAdminController } from './novelDonate.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelDonateEntity, //
        ]),
    ],
    controllers: [
        NovelDonateAdminController, //
    ],
    providers: [
        NovelDonateAdminRepository, //
    ],
})
export class NovelDonateModule {}
