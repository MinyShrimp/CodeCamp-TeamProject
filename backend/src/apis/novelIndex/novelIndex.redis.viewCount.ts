import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { NovelIndexDto } from './dto/novelIndex.dto';

@Injectable()
export class NovelIndexViewCountRedis {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManage: Cache,
    ) {}

    private readonly key = 'Episode:viewCount';

    private getKey(
        dto: NovelIndexDto, //
    ): string {
        return `${this.key}:${dto.userID}:${dto.novelIndexID}`;
    }

    async setCache(
        dto: NovelIndexDto, //
    ): Promise<boolean> {
        const key = this.getKey(dto);
        await this.cacheManage.set(key, 'cache', { ttl: 120 });
        return true;
    }

    async getCache(
        dto: NovelIndexDto, //
    ): Promise<string> {
        const key = this.getKey(dto);
        return await this.cacheManage.get<string>(key);
    }

    async checkCache(
        dto: NovelIndexDto, //
    ): Promise<boolean> {
        const cache = await this.getCache(dto);
        return cache ? true : false;
    }
}
