import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionEntity } from './entities/question.entity';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuestionRepository } from './entities/question.repository';
import { QuestionAdminController } from './question.admin.controller';
import { QuestionAdminRepository } from './entities/question.admin.repository';
import { UserRepository } from '../user/entities/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

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
        QuestionAdminRepository, //
        QuestionRepository,
        QuestionResolver,
        QuestionService,
        UserRepository,
    ],
})
export class QuestionModule {}
