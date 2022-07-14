import { InputType, PickType } from '@nestjs/graphql';

import { NoticeEntity } from '../entities/notice.entity';

@InputType()
export class CreateNoticeInput extends PickType(
    NoticeEntity,
    ['title', 'contents', 'isTop'],
    InputType,
) {}
