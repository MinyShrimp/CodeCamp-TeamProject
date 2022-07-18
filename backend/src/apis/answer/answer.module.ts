import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswerEntity } from './entities/answer.entity';
import { AnswerAdminRepository } from './entities/answer.admin.repository';

import { AnswerAdminController } from './answer.admin.controller';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { AnswerRepository } from './entities/answer.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { QuestionEntity } from '../question/entities/question.entity';
import { QuestionModule } from '../question/question.module';
import { QuestionRepository } from '../question/entities/question.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            QuestionEntity,
            AnswerEntity, //
            UserEntity,
        ]),
        QuestionModule,
        UserModule,
    ],
    controllers: [
        AnswerAdminController, //
    ],
    providers: [
        AnswerAdminRepository, //
        QuestionRepository,
        AnswerRepository,
        AnswerResolver,
        AnswerService,
    ],
})
export class AnswerModule {}
