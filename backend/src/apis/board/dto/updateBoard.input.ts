import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateBoardInput } from './createBoard.input';

@InputType()
export class UpdateBoardInput extends PartialType(CreateBoardInput) {
    @Field(() => String, { description: '원본 UUID' })
    id: string;
}
