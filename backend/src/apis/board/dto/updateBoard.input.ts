import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { BoardEntity } from '../entities/board.entity';

@InputType()
export class UpdateBoardInput extends PartialType(
    PickType(BoardEntity, ['title', 'contents'], InputType),
) {
    @Field(
        () => String, //
        { description: '유저 ID' }, //
    )
    userId: string;

    @Field(
        () => String, //
        { description: '게시글 ID' }, //
    )
    boardId: string;
}
