import { Field, InputType, PickType } from '@nestjs/graphql';

import { NoticeEntity } from '../entities/notice.entity';

@InputType()
export class CreateNoticeInput extends PickType(
    NoticeEntity,
    ['title', 'contents', 'isTop'],
    InputType,
) {
    @Field(() => [String], { description: '파일 URLs' })
    fileURLs: Array<string>;
}
