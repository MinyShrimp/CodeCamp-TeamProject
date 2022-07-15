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
        @CurrentUser() payload: IPayload,
        @Args('novelIndexID') id: string,
    ): Promise<NovelIndexEntity> {
        return this.novelIndexService.findOne(payload.id, id);
    }

    @Mutation(
        () => NovelIndexEntity, //
        { description: '에피소드 등록' },
    )
    createNovelIndex(
        @CurrentUser() payload: IPayload,
        @Args('input') input: CreateNovelIndexInput,
    ): Promise<NovelIndexEntity> {
        return this.novelIndexService.create(payload.id, input);
    }

    @Mutation(
        () => NovelIndexEntity, //
        { description: '에피소드 수정' },
    )
    updateNovelIndex(
        @CurrentUser() payload: IPayload,
        @Args('input') input: UpdateNovelIndexInput,
    ): Promise<NovelIndexEntity> {
        return this.novelIndexService.update(payload.id, input);
    }

    @Mutation(
        () => NovelIndexEntity, //
        { description: '에피소드 비공개 전환' },
    )
    changePrivateNovelIndex(
        @CurrentUser() payload: IPayload,
        @Args({ name: 'novelIndexID', description: '에피소드 UUID' })
        novelIndexID: string, //
    ): Promise<NovelIndexEntity> {
        return this.novelIndexService.changePrivate(payload.id, novelIndexID);
    }

    @Mutation(
        () => ResultMessage, //
        { description: '에피소드 삭제 취소' },
    )
    async restoreNovelIndex(
        @CurrentUser() payload: IPayload,
        @Args('novelIndexID') id: string,
    ): Promise<ResultMessage> {
        const result = await this.novelIndexService.restore(payload.id, id);
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
        @CurrentUser() payload: IPayload,
        @Args('novelIndexID') id: string,
    ): Promise<ResultMessage> {
        const result = await this.novelIndexService.delete(payload.id, id);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.NOVEL_INDEX_SOFT_DELETE_SUCCESSED
                : MESSAGES.NOVEL_INDEX_SOFT_DELETE_FAILED,
        });
    }
}
