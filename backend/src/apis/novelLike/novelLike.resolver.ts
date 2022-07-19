import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { NovelLikeEntity } from './entities/novelLike.entity';
import { NovelLikeRepository } from './entities/novelLike.repository';

import { NovelLikeService } from './novelLike.service';

@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class NovelLikeResolver {
    constructor(
        private readonly novelLikeService: NovelLikeService, //
        private readonly novelLikeRepository: NovelLikeRepository,
    ) {}

    // 선호작 목록
    @Query(
        () => [NovelLikeEntity], //
        { description: '선호작 목록' },
    )
    fetchNovelLikeInUser(
        @CurrentUser() payload: IPayload, //
    ): Promise<NovelLikeEntity[]> {
        return this.novelLikeRepository.findList(payload.id);
    }

    @Mutation(
        () => ResultMessage,
        { description: '선호작 switch' }, //
    )
    async switchNovelLike(
        @CurrentUser() payload: IPayload,
        @Args({
            name: 'novelID', //
            description: '소설 UUID',
        })
        novelID: string, //
    ): Promise<ResultMessage> {
        return await this.novelLikeService.switch({
            userID: payload.id,
            novelID: novelID,
        });
    }

    // 선호작 등록
    @Mutation(
        () => NovelLikeEntity,
        { description: '선호작 등록' }, //
    )
    createNovelLike(
        @CurrentUser() payload: IPayload,
        @Args({
            name: 'novelID', //
            description: '소설 UUID',
        })
        novelID: string, //
    ): Promise<NovelLikeEntity> {
        return this.novelLikeService.create({
            userID: payload.id,
            novelID: novelID,
        });
    }

    // 선호작 등록 취소
    @Mutation(
        () => ResultMessage,
        { description: '선호작 등록 취소' }, //
    )
    async deleteNovelLike(
        @CurrentUser() payload: IPayload,
        @Args({
            name: 'novelLikeID', //
            description: '선호작 Entity UUID',
        })
        novelLikeID: string, //
    ): Promise<ResultMessage> {
        const result = await this.novelLikeService.delete({
            userID: payload.id,
            novelLikeID: novelLikeID,
        });

        return new ResultMessage({
            id: novelLikeID,
            isSuccess: result,
            contents: result ? MESSAGES.DELETE_SUCCESS : MESSAGES.DELETE_FAILED,
        });
    }
}
