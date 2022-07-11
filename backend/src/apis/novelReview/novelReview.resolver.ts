import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CreateNovelReviewInput } from './dto/createNovelReview.input';
import { NovelReviewEntity } from './entities/novelReview.entity';
import { NovelReviewService } from './novelReview.service';

/* 소설리뷰 API */
@Resolver()
export class NovelReviewResolver {
    constructor(
        private readonly novelReviewService: NovelReviewService, //
    ) {}
    ///////////////////////////////////////////////////////////////////
    // 조회 //
    @Query(() => String)
    aaa() {
        return 'aaa';
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
        return await this.novelReviewService.createReivew(
            currentUser.id,
            novelID,
            input,
        );
    }
    ///////////////////////////////////////////////////////////////////
    // 수정 //
    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
