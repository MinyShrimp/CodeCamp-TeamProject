import { CacheModule, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { CacheValueDto } from '../dto/cache.dto';
import { TempStorageInput } from '../dto/value.input';

import { TempStorageRedis } from '../tempStorage.redis';

describe('임시 저장 테스트', () => {
    let tempRedis: TempStorageRedis;
    const dto: CacheValueDto = {
        type: 'NOVEL',
        userID: '4977e0dc-e541-4a1d-818d-55ebbd966f7a',
    };

    const value: TempStorageInput = {
        title: '제목 1',
        contents: '내용 1',
        tags: ['태그 1', '태그 2'],
    };

    beforeAll(async () => {
        const tempModule: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register<RedisClientOptions>({
                    store: redisStore,
                    url: `redis://localhost:6379`,
                    isGlobal: true,
                }),
            ],
            providers: [
                TempStorageRedis, //
            ],
        }).compile();

        tempRedis = tempModule.get<TempStorageRedis>(TempStorageRedis);
    });

    afterEach(async () => {
        await tempRedis.deleteCache(dto);
    });

    it('임시 저장', async () => {
        const tempRedisSpySet = jest.spyOn(tempRedis, 'setCache');

        let result = await tempRedis.setCache(dto, value);
        expect(result).toEqual(true);

        expect(tempRedisSpySet).toBeCalledTimes(1);
    });

    it('임시 저장 불러오기', async () => {
        const tempRedisSpySet = jest.spyOn(tempRedis, 'setCache');
        const tempRedisSpyGet = jest.spyOn(tempRedis, 'getCache');
        const tempRedisSpyCheck = jest.spyOn(tempRedis, 'checkCache');

        let check_result = await tempRedis.checkCache(dto);
        expect(check_result).toEqual(false);

        try {
            await tempRedis.getCache(dto);
        } catch (e) {
            expect(e).toBeInstanceOf(ConflictException);
        }

        let set_result = await tempRedis.setCache(dto, value);
        expect(set_result).toEqual(true);

        check_result = await tempRedis.checkCache(dto);
        expect(check_result).toEqual(true);

        let get_result = await tempRedis.getCache(dto);
        expect(get_result).toStrictEqual(value);

        expect(tempRedisSpySet).toBeCalledTimes(2);
        expect(tempRedisSpyGet).toBeCalledTimes(2);
        expect(tempRedisSpyCheck).toBeCalledTimes(2);
    });
});
