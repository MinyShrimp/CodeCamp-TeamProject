import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NovelReviewEntity } from '../entities/novelReview.entity';

@ObjectType()
export class FetchNovelReviewsOutput {
    @Field(() => [NovelReviewEntity], { description: '소설 리뷰 조회' })
    novelRivews: Array<NovelReviewEntity>;

    @Field(() => Int, { description: '전체 갯수' })
    count: number;
}
