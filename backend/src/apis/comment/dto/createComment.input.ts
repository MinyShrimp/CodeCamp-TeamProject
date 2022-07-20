import { Field, InputType, PickType } from '@nestjs/graphql';

import { CommentEntity } from '../entities/comment.entity';

@InputType()
export class CreateCommentInput extends PickType(
    CommentEntity,
    ['contents'], //
    InputType,
) {
    @Field(() => String, { description: '댓글 ID', nullable: true })
    parentID?: string;
}
