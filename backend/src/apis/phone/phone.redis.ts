import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PhoneInput } from './dto/phone.input';

@Injectable()
export class PhoneRedis {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManage: Cache,
    ) {}

    private readonly key = 'auth:phone';

    ///////////////////////////////////////////////////////////////////
    // Caching //

    async setCache(
        phoneNumber: string, //
    ) {
        const key = `${this.key}:${phoneNumber}:cache`;
        return await this.cacheManage.set(key, 'cache', { ttl: 120 });
    }

    async getCache(
        phoneNumber: string, //
    ) {
        const key = `${this.key}:${phoneNumber}:cache`;
        return await this.cacheManage.get<string>(key);
    }

    ///////////////////////////////////////////////////////////////////
    // 인증 준비 //

    async setTokenByRedis(
        phoneInput: PhoneInput, //
    ) {
        const key = `${this.key}:${phoneInput.phone}`;
        return await this.cacheManage.set(key, phoneInput.token, { ttl: 120 });
    }

    async getTokenByRedis(
        phoneNumber: string, //
    ) {
        const key = `${this.key}:${phoneNumber}`;
        return await this.cacheManage.get<string>(key);
    }

    ///////////////////////////////////////////////////////////////////
    // 인증 확인 //

    async setTokenByRedisOK(phoneInput: PhoneInput) {
        const key = `${this.key}:${phoneInput.phone}:ok`;
        return await this.cacheManage.set(key, phoneInput.token, { ttl: 0 });
    }

    async getTokenByRedisOK(
        phoneNumber: string, //
    ) {
        const key = `${this.key}:${phoneNumber}:ok`;
        return await this.cacheManage.get<string>(key);
    }

    async deleteTokenByRedisOK(
        phoneNumber: string, //
    ) {
        const key = `${this.key}:${phoneNumber}:ok`;
        return await this.cacheManage.del(key);
    }
}
