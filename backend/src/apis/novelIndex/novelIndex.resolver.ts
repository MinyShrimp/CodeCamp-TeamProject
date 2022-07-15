import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { NovelIndexEntity } from './entities/novelIndex.entity';
import { CreateNovelIndexInput } from './dto/createNovelIndex.input';
import { UpdateNovelIndexInput } from './dto/updateNovelIndex.input';

import { NovelIndexService } from './novelIndex.service';

@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class NovelIndexResolver {
    constructor(
        private readonly novelIndexService: NovelIndexService, //
    ) {}

    @Query(
        () => NovelIndexEntity, //
        { description: '에피소드 단일 조회' },
    )
    fetchOneNovelIndex(
        @CurrentUser() user: IPayload,
        @Args('novelIndexID') id: string,
    ): Promise<NovelIndexEntity> {
        return this.novelIndexService.findOne(user.id, id);
    }

    @Mutation(
        () => NovelIndexEntity, //
        { description: '에피소드 등록' },
    )
    createNovelIndex(
        @CurrentUser() user: IPayload,
        @Args('input') input: CreateNovelIndexInput,
    ): Promise<NovelIndexEntity> {
        return this.novelIndexService.create(user.id, input);
    }

    @Mutation(
        () => NovelIndexEntity, //
        { description: '에피소드 수정' },
    )
    async updateNovelIndex(
        @CurrentUser() user: IPayload,
        @Args('input') input: UpdateNovelIndexInput,
    ): Promise<NovelIndexEntity> {
        return await this.novelIndexService.update(user.id, input);
    }

    @Mutation(
        () => ResultMessage, //
        { description: '에피소드 비공개 전환' },
    )
    async changePrivateNovelIndex(
        @CurrentUser() payload: IPayload,
        @Args({ name: 'novelIndexID', description: '에피소드 UUID' })
        novelIndexID: string, //
    ) {}

    @Mutation(
        () => ResultMessage, //
        { description: '에피소드 삭제 취소' },
    )
    async restoreNovelIndex(
        @CurrentUser() user: IPayload,
        @Args('novelIndexID') id: string,
    ): Promise<ResultMessage> {
        const result = await this.novelIndexService.restore(user.id, id);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.NOVEL_INDEX_RESTORE_SUCCESSED
                : MESSAGES.NOVEL_INDEX_RESTORE_FAILED,
        });
    }

    @Mutation(
        () => ResultMessage, //
        { description: '에피소드 삭제' },
    )
    async deleteNovelIndex(
        @CurrentUser() user: IPayload,
        @Args('novelIndexID') id: string,
    ): Promise<ResultMessage> {
        const result = await this.novelIndexService.delete(user.id, id);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.NOVEL_INDEX_SOFT_DELETE_SUCCESSED
                : MESSAGES.NOVEL_INDEX_SOFT_DELETE_FAILED,
        });
    }
}
