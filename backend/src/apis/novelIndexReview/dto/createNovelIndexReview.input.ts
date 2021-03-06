import { Field, InputType, PickType } from '@nestjs/graphql';

import { NovelIndexReviewEntity } from '../entities/novelIndexReview.entity';

@InputType()
export class CreateNovelIndexReviewInput extends PickType(
    NovelIndexReviewEntity,
    ['contents', 'star'],
    InputType,
) {
    @Field(() => String, { description: 'μνΌμλ UUID' })
    episodeID: string;
}
