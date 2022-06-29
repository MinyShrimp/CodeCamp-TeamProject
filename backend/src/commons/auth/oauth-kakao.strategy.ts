import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { IUser } from '../interfaces/User.interface';

export class OAuthKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor() {
        super({
            clientID: process.env.KAKAO_CLIENT_SECRET,
            callbackURL: process.env.KAKAO_CALLBACK_URL,
        });
    }

    validate(
        accessToken: string, //
        refreshToken: string,
        profile: any,
    ): IUser {
        return {
            email: profile._json.kakao_account.email,
            name: profile.displayName,
        };
    }
}
