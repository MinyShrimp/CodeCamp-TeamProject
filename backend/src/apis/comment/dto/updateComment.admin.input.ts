import { CreateCommentAdminInput } from './createComment.admin.input';
export interface UpdateCommentAdminInput
    extends Partial<CreateCommentAdminInput> {
    originID: string;
}
