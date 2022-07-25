import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateEventInput } from './createEvent.input';

@InputType()
export class UpdateEventInput extends PartialType(
    CreateEventInput, //
) {
    @Field(() => String, { description: '원본 이벤트 UUID' })
    id: string;
}
