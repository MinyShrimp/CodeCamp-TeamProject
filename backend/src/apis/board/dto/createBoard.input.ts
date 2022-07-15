import { Field, InputType, PickType } from '@nestjs/graphql';

import { BoardEntity } from '../entities/board.entity';

@InputType()
export class CreateBoardInput extends PickType(
    BoardEntity,
    ['title', 'contents'], //
    InputType,
) {
    @Field(() => [String], { description: '파일 URLs' })
    fileURLs: Array<string>;
}
