import { CreateBoardLikeAdminInput } from './createBoardLike.admin.input';
export interface UpdateBoardLikeAdminInput
    extends Partial<CreateBoardLikeAdminInput> {
    originID: string;
}
