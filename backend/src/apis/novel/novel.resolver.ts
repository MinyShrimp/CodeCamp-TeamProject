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
import { FetchNovelsOutput } from './dto/fetchNovels.output';
import { FetchNovelInput } from './dto/fetchNovel.input';
import { SearchNovelInput } from './dto/searchNovel.input';

@Resolver()
export class NovelResolver {
    constructor(
        private readonly novelService: NovelService, //
        private readonly novelRepository: NovelRepository,
    ) {}

    @Query(
        () => FetchNovelsOutput, //
        { description: '작품 목록 조회' },
    )
    fetchNovelsPage(
        @Args('fetchNovelInput') input: FetchNovelInput, //
        @Args({ name: 'searchInput', nullable: true })
        search?: SearchNovelInput,
    ): Promise<FetchNovelsOutput> {
        return this.novelRepository.getPage(input, search);
    }

    @Query(
        () => NovelEntity, //
        { description: '소설 Detail 조회' },
    )
    fetchNovelDetail(
        @Args({ name: 'userEmail', nullable: true }) userEmail: string, //
        @Args('novelID') novelID: string, //
    ): Promise<NovelEntity> {
        return this.novelService.getDetail({
            userEmail: userEmail,
            novelID: novelID,
        });
    }

    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => FetchNovelsOutput, //
        { description: '내가 쓴 소설 목록 조회, page' },
    )
    fetchMyNovels(
        @CurrentUser() payload: IPayload, //
        @Args({
            name: 'page',
            type: () => Int,
            defaultValue: 1,
        })
        page: number,
    ): Promise<FetchNovelsOutput> {
        return this.novelRepository.getMyListPage({
            userID: payload.id,
            page: page,
        });
    }

    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => NovelEntity, //
        { description: '내가 쓴 소설 Detail 조회' },
    )
    fetchMyNovelDetail(
        @CurrentUser() payload: IPayload, //
        @Args('novelID') novelID: string, //
    ): Promise<NovelEntity> {
        return this.novelRepository.getMyDetail({
            userID: payload.id,
            novelID: novelID,
        });
    }

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NovelEntity,
        { description: '소설 등록' }, //
    )
    createNovel(
        @CurrentUser() payload: IPayload,
        @Args('createNovelInput') input: CreateNovelInput,
    ): Promise<NovelEntity> {
        return this.novelService.create(payload, input);
    }

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NovelEntity,
        { description: '소설 정보 수정' }, //
    )
    async updateNovel(
        @CurrentUser() payload: IPayload,
        @Args('updateNovelInput') input: UpdateNovelInput,
    ): Promise<NovelEntity> {
        return await this.novelService.update(payload, input);
    }

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage,
        { description: '소설 삭제 취소' }, //
    )
    async restoreNovel(
        @CurrentUser() payload: IPayload,
        @Args('novelID') novelID: string,
    ): Promise<ResultMessage> {
        const result = await this.novelService.restore(payload, novelID);
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
        @CurrentUser() payload: IPayload,
        @Args('novelID') novelID: string,
    ): Promise<ResultMessage> {
        const result = await this.novelService.delete(payload, novelID);
        return new ResultMessage({
            isSuccess: result,
            contents: result
                ? MESSAGES.NOVEL_SOFT_DELETE_SUCCESSED
                : MESSAGES.NOVEL_SOFT_DELETE_FAILED,
        });
    }
}
