import { Field, InputType, PickType } from '@nestjs/graphql';
import { BoardEntity } from 'src/apis/board/entities/board.entity';
import { CommentEntity } from '../entities/comment.entity';

@InputType()
export class CreateCommentInput extends PickType(
    CommentEntity,
    ['contents'], //
    InputType,
) {
    @Field(() => String, { description: '대댓글', nullable: true })
    parent?: CommentEntity;
}
