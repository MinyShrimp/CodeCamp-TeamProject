import { CreateQuestionAdminInput } from './createQuestion.admin.input';
export interface UpdateQuestionAdminInput
    extends Partial<CreateQuestionAdminInput> {
    originID: string;
}
