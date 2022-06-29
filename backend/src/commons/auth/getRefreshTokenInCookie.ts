import { Request } from 'express';

/**
 * Cookie에서 RefreshToken을 가져오는 함수
 * @param req
 * @returns RefreshToken
 */
export const getRefreshTokenInCookie = (req: Request): string | undefined => {
    const cookies = req.headers.cookie.split('; ');
    const refreshToken = cookies
        .map((c) => c.split('='))
        .filter((c) => c[0] === 'refreshToken')[0][1];
    return refreshToken;
};
