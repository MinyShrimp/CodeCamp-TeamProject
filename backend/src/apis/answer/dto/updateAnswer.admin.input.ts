import { CreateAnswerAdminInput } from './createAnswer.admin.input';
export interface UpdateAnswerAdminInput
    extends Partial<CreateAnswerAdminInput> {
    originID: string;
}
