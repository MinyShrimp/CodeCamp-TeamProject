import { UseGuards, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Cache } from 'cache-manager';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import {
    GqlJwtAccessGuard,
    GqlJwtRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';

import { LoginInput } from './dto/login.input';

import { AuthService } from './auth.service';

/* Auth API */
@Resolver()
export class AuthResolver {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManage: Cache,
        private readonly authService: AuthService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage,
        { description: '비밀번호 맞는지 확인' }, //
    )
    async comparePassword(
        @CurrentUser() payload: IPayload,
        @Args('pwd') pwd: string,
    ): Promise<ResultMessage> {
        const result = await this.authService.comparePwd(payload.id, pwd);

        return new ResultMessage({
            id: payload.id,
            isSuccess: result,
            contents: result ? '비밀번호가 같습니다.' : '비밀번호가 다릅니다.',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/retore/token
     * @param currentUser
     * @response JWT Access Token
     */
    @UseGuards(GqlJwtRefreshGuard)
    @Mutation(
        () => String, //
        { description: 'AccessToken 재발급' },
    )
    async restoreToken(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<string> {
        const token = await this.authService.restoreToken(currentUser.id);

        // Redis 저장
        await this.cacheManage.set(
            `blacklist:access_token:${currentUser.access_token}`,
            currentUser.id,
            { ttl: currentUser.access_exp },
        );

        return token;
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 소셜 로그인
     * @param currentUser
     * @response Message, Set-Cookie: Refresh Token
     */
    @Mutation(
        () => ResultMessage, //
        { description: 'OAuth 로그인' },
    )
    @UseGuards(GqlJwtAccessGuard)
    async LoginOAuth(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<ResultMessage> {
        const result = await this.authService.OAuthLogin(currentUser.id);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.USER_OAUTH_LOGIN_SUCCESS
                : MESSAGES.USER_OAUTH_LOGIN_FAILED,
        });
    }

    /**
     * POST /api/login
     * @param input
     * @response AccessToken
     */
    @Mutation(
        () => String, //
        { description: '로그인, Get AccessToken' },
    )
    async Login(
        @Context() context: any,
        @Args('loginInput') input: LoginInput, //
    ): Promise<string> {
        // 로그인
        return this.authService.Login(context, input);
    }

    /**
     * POST /api/logout
     * - Bearer JWT
     * @response Message
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '로그아웃, Bearer JWT' },
    )
    async Logout(
        @Context() context: any,
        @CurrentUser() currentUser: IPayload, //
    ): Promise<ResultMessage> {
        // 로그아웃
        const result = await this.authService.Logout(context, currentUser.id);

        // Redis 저장
        await this.cacheManage.set(
            `blacklist:access_token:${currentUser.access_token}`,
            currentUser.id,
            { ttl: currentUser.access_exp },
        );
        await this.cacheManage.set(
            `blacklist:refresh_token:${currentUser.refresh_token}`,
            currentUser.id,
            { ttl: currentUser.refresh_exp },
        );

        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.USER_LOGOUT_SUCCESSED
                : MESSAGES.USER_LOGOUT_FAILED,
        });
    }

    @Mutation(
        () => ResultMessage,
        { description: '강제 로그아웃' }, //
    )
    async LogoutForce() {}

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
