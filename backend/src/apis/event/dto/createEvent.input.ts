import { InputType, PickType } from '@nestjs/graphql';
import { EventEntity } from '../entities/event.entity';

@InputType()
export class CreateEventInput extends PickType(
    EventEntity, //
    ['title', 'contents', 'isEvent', 'startAt', 'endAt'],
    InputType,
) {}
