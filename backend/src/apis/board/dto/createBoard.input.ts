import { Field, InputType, PickType } from '@nestjs/graphql';
import { BoardEntity } from '../entities/board.entity';

@InputType()
export class CreateBoardInput extends PickType(
    BoardEntity,
    ['title', 'contents'], //
    InputType,
) {}
