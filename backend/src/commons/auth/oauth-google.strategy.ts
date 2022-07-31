import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { IUser } from '../interfaces/User.interface';

export class OAuthGoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        });
    }

    validate(
        accessToken: string, //
        refreshToken: string,
        profile: any,
    ): IUser {
        return {
            email: profile._json.email,
            name: profile._json.name,
        };
    }
}
