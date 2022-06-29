import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAccessStrategy } from '../../commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from '../../commons/auth/jwt-refresh.strategy';
import { OAuthGoogleStrategy } from '../../commons/auth/oauth-google.strategy';
import { OAuthKakaoStrategy } from '../../commons/auth/oauth-kakao.strategy';
import { OAuthNaverStrategy } from '../../commons/auth/oauth-naver.strategy';

import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

import { EmailEntity } from '../email/entities/email.entity';

import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity, //
            EmailEntity,
        ]),
        JwtModule.register({}),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [
        OAuthGoogleStrategy,
        OAuthKakaoStrategy,
        OAuthNaverStrategy,
        JwtRefreshStrategy,
        JwtAccessStrategy,

        AuthResolver,
        AuthService,
    ],
})
export class AuthModule {}
