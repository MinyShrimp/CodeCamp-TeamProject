import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/entities/user.repository';

import { QuestionEntity } from './entities/question.entity';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuestionRepository } from './entities/question.repository';
import { QuestionAdminController } from './question.admin.controller';
import { QuestionAdminRepository } from './entities/question.admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            QuestionEntity, //
            UserEntity,
        ]),
        UserModule,
    ],
    controllers: [
        QuestionAdminController, //
    ],
    providers: [
        UserRepository,
        QuestionService,
        QuestionResolver,
        QuestionRepository,
        QuestionAdminRepository, //
    ],
})
export class QuestionModule {}
