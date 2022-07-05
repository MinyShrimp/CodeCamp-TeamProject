import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswerEntity } from './entities/answer.entity';
import { AnswerAdminRepository } from './entities/answer.admin.repository';

import { AnswerAdminController } from './answer.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AnswerEntity, //
        ]),
    ],
    controllers: [
        AnswerAdminController, //
    ],
    providers: [
        AnswerAdminRepository, //
    ],
})
export class AnswerModule {}
