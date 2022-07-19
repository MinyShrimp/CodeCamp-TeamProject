import { InputType, PickType } from '@nestjs/graphql';
import { QuestionEntity } from '../entities/question.entity';

@InputType()
export class CreateQuestionInput extends PickType(
    QuestionEntity,
    ['title', 'contents'],
    InputType,
) {}
