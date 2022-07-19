import { InputType, PickType } from '@nestjs/graphql';
import { AnswerEntity } from '../entities/answer.entity';

@InputType()
export class CreateAnswerInput extends PickType(
    AnswerEntity, //
    ['title', 'contents'],
    InputType,
) {}
