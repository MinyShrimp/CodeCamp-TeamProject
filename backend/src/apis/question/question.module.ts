import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionEntity } from './entities/question.entity';
import { QuestionAdminRepository } from './entities/question.admin.repository';

import { QuestionAdminController } from './question.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            QuestionEntity, //
        ]),
    ],
    controllers: [
        QuestionAdminController, //
    ],
    providers: [
        QuestionAdminRepository, //
    ],
})
export class QuestionModule {}
