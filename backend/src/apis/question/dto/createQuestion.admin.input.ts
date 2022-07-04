import { QuestionEntity } from '../entities/question.entity';
export interface CreateQuestionAdminInput extends Omit<QuestionEntity, 'id'> {}
