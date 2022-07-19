import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateQuestionInput } from './createQuestion.input';

@InputType()
export class UpdateQuestionInput extends PartialType(
    CreateQuestionInput, //
) {
    @Field(() => String, { description: '원본 문의 UUID' })
    id: string;
}
