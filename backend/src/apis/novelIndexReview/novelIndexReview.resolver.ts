import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { NovelIndexReviewEntity } from './entities/novelIndexReview.entity';
import { NovelIndexReviewRepository } from './entities/novelIndexReview.repository';

import { FetchEpisodeReviewOutput } from './dto/fetchEpisodeReview.output';
import { CreateNovelIndexReviewInput } from './dto/createNovelIndexReview.input';
import { UpdateNovelIndexReviewInput } from './dto/updateNovelIndexReview.input';

import { NovelIndexReviewService } from './novelIndexReview.service';

/* 편당 리뷰 API */
@Resolver()
export class NovelIndexReviewResolver {
    constructor(
        private readonly episodeReviewService: NovelIndexReviewService, //
        private readonly episodeReviewRepository: NovelIndexReviewRepository,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 해당 에피소드의 리뷰 조회, Page */
    @Query(
        () => FetchEpisodeReviewOutput, //
        { description: '해당 에피소드의 리뷰 조회, Page' },
    )
    async fetchEpisodeReviewPage(
        @Args('episodeID') episodeID: string,
        @Args({ name: 'page', type: () => Int }) page: number,
    ): Promise<FetchEpisodeReviewOutput> {
        return await this.episodeReviewRepository.findReviewPage({
            page: page,
            episodeID: episodeID,
        });
    }

    ///////////////////////////////////////////////////////////////////q
    // 생성 //
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NovelIndexReviewEntity, //
        { description: '편당 리뷰 작성' },
    )
    async createEpisodeReview(
        @CurrentUser() currentUser: IPayload, //
        @Args('createEpisodeReviewInput') input: CreateNovelIndexReviewInput,
    ): Promise<NovelIndexReviewEntity> {
        return await this.episodeReviewService.createReview(
            currentUser.id,
            input,
        );
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NovelIndexReviewEntity, //
        { description: '에피소드 별 리뷰 수정' },
    )
    async updateEpisodeReview(
        @Args('updateEpisodeReviewInput') input: UpdateNovelIndexReviewInput,
    ): Promise<NovelIndexReviewEntity> {
        return await this.episodeReviewService.updateReview(input);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String, //
        { description: '에피소드 별 리뷰 삭제' },
    )
    deleteEpisodeReview(
        @Args('ReviewID') reviewID: string, //
    ): Promise<string> {
        return this.episodeReviewService.softDelete(reviewID);
    }
}
