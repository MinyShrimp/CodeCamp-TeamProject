import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { NovelEntity } from './entities/novel.entity';
import { NovelRepository } from './entities/novel.repository';
import { CreateNovelInput } from './dto/createNovel.input';

import { NovelService } from './novel.service';
import { UpdateNovelInput } from './dto/updateNovel.input';

@Resolver()
export class NovelResolver {
    constructor(
        private readonly novelService: NovelService, //
        private readonly novelRepository: NovelRepository,
    ) {}

    @Query(
        () => [NovelEntity], //
        { description: '소설 전체 목록 조회' },
    )
    fetchNovelsAll(): Promise<Array<NovelEntity>> {
        return this.novelRepository.getAll();
    }

    @Query(
        () => [NovelEntity], //
        { description: '소설 목록 조회 ( page )' },
    )
    fetchNovelsPage(
        @Args({ name: 'page', type: () => Int }) page: number,
    ): Promise<Array<NovelEntity>> {
        return this.novelRepository.getPage(page);
    }

    @Query(
        () => Int,
        { description: '소설 전체 갯수 조회' }, //
    )
    fetchNovelCount(): Promise<number> {
        return this.novelRepository.getCount();
    }

    @Query(
        () => NovelEntity, //
        { description: '소설 Detail 조회' },
    )
    fetchNovelDetail(
        @Args('novelID') novelID: string, //
    ): Promise<NovelEntity> {
        return this.novelRepository.getOne(novelID);
    }

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NovelEntity,
        { description: '소설 등록' }, //
    )
    createNovel(
        @CurrentUser() user: IPayload,
        @Args('createNovelInput') input: CreateNovelInput,
    ): Promise<NovelEntity> {
        return this.novelService.create(user, input);
    }

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NovelEntity,
        { description: '소설 정보 수정' }, //
    )
    async updateNovel(
        @CurrentUser() user: IPayload,
        @Args('updateNovelInput') input: UpdateNovelInput,
    ): Promise<NovelEntity> {
        return await this.novelService.update(user, input);
    }

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage,
        { description: '소설 삭제 취소' }, //
    )
    async restoreNovel(
        @CurrentUser() user: IPayload,
        @Args('novelID') novelID: string,
    ): Promise<ResultMessage> {
        const result = await this.novelService.restore(user, novelID);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.NOVEL_RESTORE_SUCCESSED
                : MESSAGES.NOVEL_RESTORE_FAILED,
        });
    }

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage,
        { description: '소설 삭제' }, //
    )
    async deleteNovel(
        @CurrentUser() user: IPayload,
        @Args('novelID') novelID: string,
    ): Promise<ResultMessage> {
        const result = await this.novelService.delete(user, novelID);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.NOVEL_SOFT_DELETE_SUCCESSED
                : MESSAGES.NOVEL_SOFT_DELETE_FAILED,
        });
    }
}
