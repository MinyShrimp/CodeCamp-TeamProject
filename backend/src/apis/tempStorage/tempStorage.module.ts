import { Module } from '@nestjs/common';
import { TempStorageRedis } from './tempStorage.redis';
import { TempStorageResolver } from './tempStorage.resolver';

@Module({
    imports: [],
    exports: [
        TempStorageRedis, //
    ],
    providers: [
        TempStorageRedis,
        TempStorageResolver, //
    ],
})
export class TempStorageModule {}
