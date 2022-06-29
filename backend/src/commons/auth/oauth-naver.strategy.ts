import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { IUser } from '../interfaces/User.interface';

export class OAuthNaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor() {
        super({
            clientID: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
            callbackURL: process.env.NAVER_CALLBACK_URL,
        });
    }

    validate(
        accessToken: string, //
        refreshToken: string,
        profile: any,
    ): IUser {
        return {
            email: profile._json.email,
            name: profile.displayName,
        };
    }
}
