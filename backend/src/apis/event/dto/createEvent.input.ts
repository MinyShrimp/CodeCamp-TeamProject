import { Field, InputType, PickType } from '@nestjs/graphql';

import { EventEntity } from '../entities/event.entity';

@InputType()
export class CreateEventInput extends PickType(
    EventEntity, //
    ['title', 'contents', 'isEvent', 'startAt', 'endAt'],
    InputType,
) {
    @Field(() => [String], { description: '파일 URLs' })
    fileURLs: Array<string>;
}
