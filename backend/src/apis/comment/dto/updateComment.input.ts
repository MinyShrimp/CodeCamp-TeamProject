import { Field, InputType, PickType } from '@nestjs/graphql';

import { CommentEntity } from '../entities/comment.entity';

@InputType()
export class UpdateCommentInput extends PickType(
    CommentEntity,
    ['contents'], //
    InputType,
) {
    @Field(() => String, { description: '원본 UUID' })
    id: string;
}
