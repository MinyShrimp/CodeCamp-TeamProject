import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CreateNovelIndexReviewInput } from './dto/createNovelIndexReview.input';
import { NovelIndexReviewEntity } from './entities/novelIndexReview.entity';

import { NovelIndexReviewService } from './novelIndexReview.service';

/* 편당 리뷰 API */
@Resolver()
export class NovelIndexReviewResolver {
    constructor(
        private readonly episodeService: NovelIndexReviewService, //
    ) {}

    @Query(() => String)
    aaa() {
        return 'aaa';
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
}
