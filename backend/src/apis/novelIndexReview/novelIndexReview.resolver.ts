import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { NovelIndexReviewEntity } from './entities/novelIndexReview.entity';
import { NovelIndexReviewService } from './novelIndexReview.service';
import { CreateNovelIndexReviewInput } from './dto/createNovelIndexReview.input';
import { UpdateNovelIndexReviewInput } from './dto/updateNovelIndexReview.input';

/* 편당 리뷰 API */
@Resolver()
export class NovelIndexReviewResolver {
    constructor(
        private readonly episodeService: NovelIndexReviewService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 해당 에피소드의 모든 리뷰 조회 */
    @Query(
        () => [NovelIndexReviewEntity], //
        { description: '해당 에피소드의 리뷰 전체 조회 ' },
    )
    async fetchEpisodeReviewAll(
        @Args('novelIndex') episodeID: string, //
    ): Promise<NovelIndexReviewEntity[]> {
        return await this.episodeService.findAll(episodeID);
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
        return await this.episodeService.createReview(currentUser.id, input);
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
        return await this.episodeService.updateReview(input);
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
        return this.episodeService.softDelete(reviewID);
    }
}
