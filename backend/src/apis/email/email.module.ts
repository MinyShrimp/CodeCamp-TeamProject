import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailEntity } from './entities/email.entity';
import { EmailRepository } from './entities/email.repository';

import { EmailService } from './email.service';
import { EmailController } from './email.controller';

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
    ],
    providers: [
        EmailRepository, //
        EmailService,
    ],
})
export class EmailModule {}
