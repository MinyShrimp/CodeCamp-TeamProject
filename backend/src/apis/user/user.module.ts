import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from '../email/email.module';
import { PhoneModule } from '../phone/phone.module';

import { UserEntity } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserCheckService } from './userCheck.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity, //
        ]),
        PhoneModule,
        EmailModule,
    ],
    exports: [
        UserRepository,
        UserService, //
        UserCheckService,
    ],
    controllers: [],
    providers: [
        UserResolver, //
        UserRepository,
        UserService,
        UserCheckService,
    ],
})
export class UserModule {}
