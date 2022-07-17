import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NovelIndexReviewEntity } from '../entities/novelIndexReview.entity';

@ObjectType()
export class FetchEpisodeReviewOutput {
    @Field(() => Int, { description: '리뷰 목록 전체 갯수' })
    count: number;

    @Field(() => [NovelIndexReviewEntity], { description: '조회된 리뷰 목록' })
    reviews: Array<NovelIndexReviewEntity>;
}
