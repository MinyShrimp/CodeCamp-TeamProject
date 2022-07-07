import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { TEMP_TYPE } from './dto/type.enum';
import { TempStorageInput } from './dto/value.input';
import { TempStorageOutput } from './dto/value.output';

import { TempStorageRedis } from './tempStorage.redis';

@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class TempStorageResolver {
    constructor(
        private readonly tempStorageRedis: TempStorageRedis, //
    ) {}

    @Query(
        () => Boolean, //
        { description: '임시 저장된 데이터가 있는지 확인' },
    )
    async CheckTempStorageValid(
        @CurrentUser() currentUser: IPayload, //
        @Args({ name: 'TEMP_TYPE', type: () => TEMP_TYPE }) type: TEMP_TYPE,
    ): Promise<boolean> {
        return this.tempStorageRedis.checkCache({
            userID: currentUser.id,
            type: type,
        });
    }

    @Query(
        () => TempStorageOutput, //
        { description: '임시 저장된 데이터 가져오기' },
    )
    async GetTempStorageValue(
        @CurrentUser() currentUser: IPayload, //
        @Args({ name: 'TEMP_TYPE', type: () => TEMP_TYPE }) type: TEMP_TYPE,
    ): Promise<TempStorageOutput> {
        return this.tempStorageRedis.getCache({
            userID: currentUser.id,
            type: type,
        });
    }

    @Mutation(
        () => Boolean, //
        { description: '임시 저장하기' },
    )
    async SetTempStorageValue(
        @CurrentUser() currentUser: IPayload, //
        @Args('value') value: TempStorageInput,
        @Args({ name: 'TEMP_TYPE', type: () => TEMP_TYPE }) type: TEMP_TYPE,
    ): Promise<boolean> {
        return this.tempStorageRedis.setCache(
            {
                userID: currentUser.id,
                type: type,
            },
            value,
        );
    }

    @Mutation(
        () => Boolean, //
        { description: '임시 저장된 데이터 삭제하기' },
    )
    async DeleteTempStorageValue(
        @CurrentUser() currentUser: IPayload, //
        @Args({ name: 'TEMP_TYPE', type: () => TEMP_TYPE }) type: TEMP_TYPE,
    ): Promise<boolean> {
        return this.tempStorageRedis.deleteCache({
            userID: currentUser.id,
            type: type,
        });
    }
}
