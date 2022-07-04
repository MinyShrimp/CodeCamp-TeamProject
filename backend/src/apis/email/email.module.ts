import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailEntity } from './entities/email.entity';
import { EmailRepository } from './entities/email.repository';
import { EmailAdminRepository } from './entities/email.admin.repository';

import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailAdminController } from './email.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EmailEntity, //
        ]),
    ],
    exports: [
        EmailRepository, //
        EmailService,
    ],
    controllers: [
        EmailController, //
        EmailAdminController,
    ],
    providers: [
        EmailRepository, //
        EmailService,
        EmailAdminRepository,
    ],
})
export class EmailModule {}
