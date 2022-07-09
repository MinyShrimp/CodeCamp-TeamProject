import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { IPayload } from 'src/commons/interfaces/Payload.interface';

import { NovelEntity } from './entities/novel.entity';
import { NovelRepository } from './entities/novel.repository';
import { CreateNovelInput } from './dto/createNovel.input';

import { NovelService } from './novel.service';

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
    fetchNovelsAll() {
        return this.novelRepository.findAll();
    }

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NovelEntity,
        { description: '소설 등록' }, //
    )
    createNovel(
        @CurrentUser() user: IPayload,
        @Args('createNovelInput') input: CreateNovelInput, //
    ): Promise<NovelEntity> {
        return this.novelService.create(user.id, input);
    }
}
