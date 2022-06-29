import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { decode } from 'jsonwebtoken';

import { IPayload, IPayloadSub } from '../interfaces/Payload.interface';
import { getRefreshTokenInCookie } from './getRefreshTokenInCookie';

export class JwtAdminStrategy extends PassportStrategy(
    Strategy,
    'jwtAdminGuard',
) {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_KEY,
            passReqToCallback: true,
        });
    }

    /* 검증 성공 시 실행 */
    async validate(
        req: Request,
        payload: IPayloadSub, //
    ): Promise<IPayload> {
        if (!payload.isAdmin) {
            throw new UnauthorizedException();
        }

        const refresh_token = getRefreshTokenInCookie(req);
        const access_token = req.headers.authorization.split(' ')[1];

        if (!refresh_token || !access_token) {
            throw new UnauthorizedException();
        }

        const refresh_jwt = decode(refresh_token) as IPayloadSub;
        const access_cache = await this.cacheManager.get(
            `blacklist:access_token:${access_token}`,
        );

        if (access_cache) {
            throw new UnauthorizedException();
        }

        /* req.user */
        return {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            isAdmin: payload.isAdmin ?? false,
            access_exp: payload.exp - payload.iat,
            access_token: access_token,
            refresh_exp:
                refresh_jwt === null ? 0 : refresh_jwt.exp - refresh_jwt.iat,
            refresh_token: refresh_token,
        };
    }
}
