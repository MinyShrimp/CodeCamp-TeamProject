import { Field, Int, ObjectType } from '@nestjs/graphql';

import { CommentEntity } from '../entities/comment.entity';

@ObjectType()
export class FetchCommentOutput {
    @Field(() => [CommentEntity])
    comments: CommentEntity[];

    @Field(() => Int)
    count: number;
}
