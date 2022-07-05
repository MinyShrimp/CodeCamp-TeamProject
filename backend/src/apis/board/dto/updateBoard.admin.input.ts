import { CreateBoardAdminInput } from './createBoard.admin.input';
export interface UpdateBoardAdminInput
    extends Partial<CreateBoardAdminInput> {
    originID: string;
}
