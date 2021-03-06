import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { IPayloadSub } from '../../commons/interfaces/Payload.interface';
import { MESSAGES } from '../../commons/message/Message.enum';

import { UserEntity } from '../user/entities/user.entity';
import { UserCheckService } from '../user/userCheck.service';

import { LoginInput } from './dto/login.input';
import { UserRepository } from '../user/entities/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly userCheckService: UserCheckService,
    ) {}

    private logger = new Logger('Auth');

    ///////////////////////////////////////////////////////////////////
    // Utils //

    /**
     * Hash 비밀번호 비교
     * @param originPwd
     * @param hashPwd
     * @returns isCompare
     */
    comparePassword(
        originPwd: string, //
        hashPwd: string,
    ): boolean {
        if (!bcrypt.compareSync(originPwd, hashPwd)) {
            throw new ConflictException(MESSAGES.USER_COMPARE_PWD_FAILED);
        }
        return true;
    }

    /**
     * JWT Payload Data
     * @param user
     * @returns Payload
     */
    private getPayload(
        user: UserEntity, //
    ): IPayloadSub {
        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            nickName: user.nickName,
        };

        // 권한 처리
        // if (user.userClass.id === 'ADMIN') {
        //     payload['isAdmin'] = true;
        // }

        return payload;
    }

    /**
     * JWT Get Access Token
     * @param user
     * @returns Access Token
     *
     * 만료 기간: 1시간
     */
    getAccessToken(
        user: UserEntity, //
    ): string {
        const payload = this.getPayload(user);
        return this.jwtService.sign(payload, {
            /* Options */
            secret: process.env.JWT_ACCESS_KEY,
            expiresIn: '1w',
        });
    }

    /**
     * JWT Set Refresh Token
     * @param user
     *
     * 만료기간: 2주
     */
    setRefreshToken(
        user: UserEntity, //
        res: Response,
    ): string {
        const payload = this.getPayload(user);

        const refreshToken = this.jwtService.sign(payload, {
            /* Options */
            secret: process.env.JWT_REFRESH_KEY,
            expiresIn: '2w',
        });

        if (process.env.MODE === 'PRODUCTION') {
            // 배포 환경
            res.setHeader(
                'Set-Cookie',
                `refreshToken=${refreshToken}; path=/; domain=.miny-shrimp.shop; SameSite=None; Secure; httpOnly;`,
            );
        } else {
            // 개발 환경
            res.setHeader(
                'Set-Cookie',
                `refreshToken=${refreshToken}; path=/; domain=.jp.ngrok.io; SameSite=None; Secure; httpOnly;`,
                // `refreshToken=${refreshToken}; path=/; `,
            );
        }

        return refreshToken;
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * JWT 재발급
     * @param userID
     * @returns AccessToken
     */
    async restoreToken(
        userID: string, //
    ): Promise<string> {
        const user = await this.userRepository.findOneByID(userID);
        return this.getAccessToken(user);
    }

    ///////////////////////////////////////////////////////////////////
    // 인증 //

    /**
     * 소셜 로그인
     */
    async OAuthLogin(
        userID: string, //
    ): Promise<boolean> {
        const result = await this.userRepository.login(userID);
        return result.affected ? true : false;
    }

    /**
     * 로그인
     * @param context
     * @param input
     * @returns J.W.T
     */
    async Login(
        context: any,
        input: LoginInput, //
    ): Promise<string> {
        // 검색
        const user = await this.userRepository.findOneByEmail(input.email);

        // 존재 여부 검사
        this.userCheckService.checkValidUser(user);

        // Set Refresh Token
        const refresh_token = this.setRefreshToken(user, context.res);

        // 비밀번호 검사
        this.comparePassword(input.pwd, user.pwd);

        // 로그인 성공
        await this.userRepository.login(user.id);
        this.logger.log(`Login ${user.nickName}`);

        // jwt 생성
        const access_token = this.getAccessToken(user);

        return access_token;
    }

    /**
     * 로그아웃
     * @param userID
     * @returns ResultMessage
     */
    async Logout(
        context: any,
        userID: string, //
    ): Promise<boolean> {
        // 검색
        const user = await this.userRepository.findOneByID(userID);

        // 존재 여부 검사
        this.userCheckService.checkValidUser(user);

        // 로그아웃 시도
        const result = await this.userRepository.logout(userID);

        if (process.env.MODE === 'PRODUCTION') {
            context.res.setHeader(
                'Set-Cookie',
                `refreshToken=; path=/; domain=.miny-shrimp.shop; SameSite=None; Secure; httpOnly;`,
            );
        } else {
            context.res.setHeader(
                'Set-Cookie',
                `refreshToken=; path=/; domain=.jp.ngrok.io; SameSite=None; Secure; httpOnly;`,
            );
        }

        this.logger.log(`Logout ${user.nickName}`);

        // 메세지 반환
        return result.affected ? true : false;
    }

    /**
     * 단순 비밀번호 비교
     */
    async comparePwd(
        userID: string, //
        pwd: string,
    ): Promise<boolean> {
        const hashPwd = await this.userRepository.getPwd(userID);
        return bcrypt.compareSync(pwd, hashPwd);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
