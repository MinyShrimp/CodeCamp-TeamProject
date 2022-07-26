import { CreateCommentLikeAdminInput } from './createCommentLike.admin.input';

export interface UpdateCommentLikeAdminInput
    extends Partial<CreateCommentLikeAdminInput> {
    originID: string;
}
