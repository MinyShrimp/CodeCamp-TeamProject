import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
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

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NovelEntity,
        { description: '소설 등록' }, //
    )
    createNovel(
        @CurrentUser() user: IPayload,
        @Args('createNovelInput') input: CreateNovelInput,
    ): Promise<NovelEntity> {
        return this.novelService.create(user.id, input);
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
        return await this.novelService.update(user.id, input);
    }

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String,
        { description: '소설 삭제 취소' }, //
    )
    async restoreNovel(
        @CurrentUser() user: IPayload,
        @Args('novelID') novelID: string,
    ): Promise<String> {
        const result = await this.novelService.restore(user.id, novelID);
        return result
            ? MESSAGES.NOVEL_RESTORE_SUCCESSED
            : MESSAGES.NOVEL_RESTORE_FAILED;
    }

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String,
        { description: '소설 삭제' }, //
    )
    async deleteNovel(
        @CurrentUser() user: IPayload,
        @Args('novelID') novelID: string,
    ): Promise<String> {
        const result = await this.novelService.delete(user.id, novelID);
        return result
            ? MESSAGES.NOVEL_SOFT_DELETE_SUCCESSED
            : MESSAGES.NOVEL_SOFT_DELETE_FAILED;
    }
}
