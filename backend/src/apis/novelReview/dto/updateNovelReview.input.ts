import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateNovelReviewInput } from './createNovelReview.input';

@InputType()
export class UpdateNovelReviewInput extends PartialType(
    CreateNovelReviewInput,
) {
    @Field(() => String, { description: '리뷰 UUID ' })
    id: string;
}
