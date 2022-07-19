import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateAnswerInput } from './createAnswer.input';

@InputType()
export class UpdateAnswerInput extends PartialType(
    CreateAnswerInput, //
) {
    @Field(() => String, { description: '원본 답변 UUID' })
    id: string;
}
