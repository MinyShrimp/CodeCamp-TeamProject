import { Field, InputType, PickType } from '@nestjs/graphql';

import { CommentEntity } from '../entities/comment.entity';

@InputType()
export class CreateCommentInput extends PickType(
    CommentEntity,
    ['contents'], //
    InputType,
) {
    @Field(() => String, { description: '댓글', nullable: true })
    parent?: CommentEntity;

    @Field(() => [String], { description: '대댓글', nullable: true })
    children?: CommentEntity[];
}
