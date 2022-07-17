import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Query, Args, Int } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { NovelReviewEntity } from './entities/novelReview.entity';
import { NovelReviewService } from './novelReview.service';
import { CreateNovelReviewInput } from './dto/createNovelReview.input';
import { UpdateNovelReviewInput } from './dto/updateNovelReview.input';
import { FetchNovelReviewsOutput } from './dto/fetchNovelReviews.output';
import { NovelReviewRepository } from './entities/novelReview.repository';

/* 소설리뷰 API */
@Resolver()
export class NovelReviewResolver {
    constructor(
        private readonly novelReviewService: NovelReviewService, //
        private readonly nnovelReviewRepository: NovelReviewRepository,
    ) {}
    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 해당 소설 리뷰 조회, Page */
    @Query(
        () => FetchNovelReviewsOutput, //
        { description: '소설 리뷰 조회, Page' },
    )
    async fetchNovelReviewPage(
        @Args('novelID') novelID: string,
        @Args({ name: 'page', type: () => Int, defaultValue: 1 }) page: number, //
    ): Promise<FetchNovelReviewsOutput> {
        return await this.nnovelReviewRepository.findPage({
            novelID: novelID,
            page: page,
        });
    }

    /** 유저가 쓴 소설 리뷰 조회 */
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [NovelReviewEntity], //
        { description: '유저가 쓴 소설 리뷰 조회' },
    )
    fetchUserNovelReview(
        @CurrentUser() payload: IPayload, //
    ) {
        return this.novelReviewService.findTargetReview(payload);
    }

    ///////////////////////////////////////////////////////////////////q
    // 생성 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NovelReviewEntity, //
        { description: '소설 리뷰 작성 ' },
    )
    async createNovelReview(
        @CurrentUser() currentUser: IPayload, //
        @Args('createReviewInput') input: CreateNovelReviewInput,
        @Args('novel') novelID: string,
    ): Promise<NovelReviewEntity> {
        return await this.novelReviewService.createReview(
            currentUser.id,
            novelID,
            input,
        );
    }
    ///////////////////////////////////////////////////////////////////
    // 수정 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => NovelReviewEntity, //
        { description: '소설 리뷰 수정' },
    )
    async updateNovelReview(
        @Args('updateNovelReviewInput') input: UpdateNovelReviewInput,
    ): Promise<NovelReviewEntity> {
        return await this.novelReviewService.updateReview(input);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String, //
        { description: '소설 리뷰 삭제' },
    )
    deleteNovelReview(
        @Args('ReviewID') reviewID: string, //
    ): Promise<string> {
        return this.novelReviewService.softDelete(reviewID);
    }
}
