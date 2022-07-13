import { Query, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { UserLikeService } from './userLike.service';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { UserLikeEntity } from './entities/userLike.entity';

@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class UserLikeResolver {
    constructor(
        private readonly userLikeService: UserLikeService, //
    ) {}

    // 선호 작가 등록
    @Mutation(
        () => UserLikeEntity, //
        { description: '선호 작가 등록' },
    )
    createUserLike(
        @CurrentUser() payload: IPayload,
        @Args('userID', { description: '등록할 유저 UUID' }) userID: string,
    ): Promise<UserLikeEntity> {
        return this.userLikeService.create({
            fromID: payload.id,
            toID: userID,
        });
    }

    // 선호 작가 삭제
    @Mutation(
        () => ResultMessage, //
        { description: '선호 작가 삭제' },
    )
    async deleteUserLike(
        @CurrentUser() payload: IPayload,
        @Args('userLikeID', { description: '삭제할 UUID' }) userLikeID: string,
    ): Promise<ResultMessage> {
        const result = await this.userLikeService.delete({
            fromID: payload.id,
            userLikeID,
        });

        return new ResultMessage({
            id: userLikeID,
            isSuccess: result,
            contents: result ? '삭제 완료' : '삭제 실패',
        });
    }
}
