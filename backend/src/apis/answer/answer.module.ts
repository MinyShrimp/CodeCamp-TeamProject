import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { QuestionModule } from '../question/question.module';
import { QuestionEntity } from '../question/entities/question.entity';
import { QuestionRepository } from '../question/entities/question.repository';

import { AnswerEntity } from './entities/answer.entity';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { AnswerRepository } from './entities/answer.repository';
import { AnswerAdminController } from './answer.admin.controller';
import { AnswerAdminRepository } from './entities/answer.admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            AnswerEntity, //
            QuestionEntity,
        ]),
        UserModule,
        QuestionModule,
    ],
    controllers: [
        AnswerAdminController, //
    ],
    providers: [
        AnswerService,
        AnswerResolver,
        AnswerRepository,
        QuestionRepository,
        AnswerAdminRepository, //
    ],
})
export class AnswerModule {}
