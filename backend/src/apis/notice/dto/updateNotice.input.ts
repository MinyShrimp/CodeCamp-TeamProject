import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateNoticeInput } from './createNotice.input';

@InputType()
export class UpdateNoticeInput extends PartialType(
    CreateNoticeInput, //
) {
    @Field(() => String, { description: '원본 공지사항 UUID' })
    id: string;
}
