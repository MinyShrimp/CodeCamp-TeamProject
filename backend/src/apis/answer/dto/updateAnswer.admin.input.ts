import { AnswerEntity } from '../entities/answer.entity';
export interface UpdateAnswerAdminInput
    extends Partial<Pick<AnswerEntity, 'title' | 'contents'>> {
    originID: string;
}
