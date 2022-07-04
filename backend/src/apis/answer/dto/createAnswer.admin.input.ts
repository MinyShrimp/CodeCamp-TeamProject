import { AnswerEntity } from '../entities/answer.entity';
export interface CreateAnswerAdminInput extends Omit<AnswerEntity, 'id'> {}
