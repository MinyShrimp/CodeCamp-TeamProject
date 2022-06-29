import { Response } from 'express';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IUser } from '../../commons/interfaces/User.interface';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/entities/user.repository';

interface IOAuthRequest extends Request {
    user: IUser;
}

@Controller()
export class AuthController {
    private readonly REDIRECT = `${process.env.FE_URL}/auth/token/oauth`;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService, //
        private readonly userService: UserService,
    ) {}

    /**
     * OAuth Login Process
     * @param userInfo
     * @param res
     */
    private async OAuthLogin(
        userInfo: IUser, //
        res: Response,
    ): Promise<void> {
        // 1. 가입 확인
        let user = await this.userRepository.findOneByEmail(userInfo.email);

        // 1-1. 이미 가입되어 있으면 통과
        // 1-2. 가입이 안되어 있으면 회원가입
        if (!user) {
            user = await this.userService.createUserOAuth(userInfo);
        }

        // 2. 로그인
        this.authService.setRefreshToken(user, res);
    }

    /**
     * OAuth: Google
     * @param req
     * @param res
     */
    @Get('/login/google')
    @UseGuards(AuthGuard('google'))
    async LoginGoogle(
        @Req() req: IOAuthRequest, //
        @Res() res: Response,
    ): Promise<void> {
        // 1. 가입 확인
        // 1-1. 이미 가입되어 있으면 통과
        // 1-2. 가입이 안되어 있으면 회원가입
        // 2. 로그인
        await this.OAuthLogin(req.user, res);

        // 3. Redirect
        res.redirect(this.REDIRECT);
    }

    /**
     * OAuth: Kakao
     * @param req
     * @param res
     */
    @Get('/login/kakao')
    @UseGuards(AuthGuard('kakao'))
    async LoginKakao(
        @Req() req: IOAuthRequest, //
        @Res() res: Response,
    ): Promise<void> {
        // 1. 가입 확인
        // 1-1. 이미 가입되어 있으면 통과
        // 1-2. 가입이 안되어 있으면 회원가입
        // 2. 로그인
        await this.OAuthLogin(req.user, res);

        // 3. Redirect
        res.redirect(this.REDIRECT);
    }

    /**
     * OAuth: Naver
     * @param req
     * @param res
     */
    @Get('/login/naver')
    @UseGuards(AuthGuard('naver'))
    async LoginNaver(
        @Req() req: IOAuthRequest, //
        @Res() res: Response,
    ): Promise<void> {
        // 1. 가입 확인
        // 1-1. 이미 가입되어 있으면 통과
        // 1-2. 가입이 안되어 있으면 회원가입
        // 2. 로그인
        await this.OAuthLogin(req.user, res);

        // 3. Redirect
        res.redirect(this.REDIRECT);
    }
}
