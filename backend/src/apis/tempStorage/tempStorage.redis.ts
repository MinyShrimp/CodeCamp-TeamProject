import { Cache } from 'cache-manager';
import {
    CACHE_MANAGER,
    ConflictException,
    Inject,
    Injectable,
} from '@nestjs/common';

import { CacheValueDto } from './dto/cache.dto';
import { TempStorageInput } from './dto/value.input';
import { TempStorageOutput } from './dto/value.output';

@Injectable()
export class TempStorageRedis {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManage: Cache,
    ) {}

    private __getKey(
        dto: CacheValueDto, //
    ): string {
        return `temp:${dto.type}:${dto.userID}`;
    }

    private async __getCache(
        dto: CacheValueDto, //
    ): Promise<TempStorageOutput | unknown> {
        const key = this.__getKey(dto);
        return await this.cacheManage.get(key);
    }

    async checkCache(
        dto: CacheValueDto, //
    ): Promise<boolean> {
        return (await this.__getCache(dto)) !== null;
    }

    async getCache(
        dto: CacheValueDto, //
    ): Promise<TempStorageOutput> {
        const result = await this.__getCache(dto);

        if (result) {
            return result as TempStorageOutput;
        } else {
            throw new ConflictException(
                '임시 저장된 데이터가 존재하지 않습니다.',
            );
        }
    }

    async setCache(
        dto: CacheValueDto, //
        value: TempStorageInput,
    ): Promise<boolean> {
        const key = this.__getKey(dto);
        const result = await this.cacheManage.set(key, value, { ttl: 0 });
        return (result as unknown as string) === 'OK';
    }

    async deleteCache(
        dto: CacheValueDto, //
    ): Promise<boolean> {
        const key = this.__getKey(dto);
        const result = await this.cacheManage.del(key);
        return result === 1;
    }
}
