import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateNovelIndexReviewInput } from './createNovelIndexReview.input';

@InputType()
export class UpdateNovelIndexReviewInput extends PartialType(
    CreateNovelIndexReviewInput,
) {
    @Field(() => String, { description: '에피소드 UUID' })
    novelIndex: string;
}
