import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateCommentInput } from './createComment.input';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
    @Field(() => String, { description: '원본 UUID' })
    id: string;
}
