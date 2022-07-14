import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { NovelModule } from '../novel/novel.module';

import { NovelDonateEntity } from './entities/novelDonate.entity';
import { NovelDonateRepository } from './entities/novelDonate.repository';
import { NovelDonateAdminRepository } from './entities/novelDonate.admin.repository';

import { NovelDonateService } from './novelDonate.service';
import { NovelDonateResolver } from './novelDonate.resolver';
import { NovelDonateAdminController } from './novelDonate.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NovelDonateEntity, //
        ]),
        UserModule,
        NovelModule,
    ],
    controllers: [
        NovelDonateAdminController, //
    ],
    providers: [
        NovelDonateAdminRepository, //

        NovelDonateService,
        NovelDonateResolver,
        NovelDonateRepository,
    ],
})
export class NovelDonateModule {}
