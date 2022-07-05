import { CreateUserLikeAdminInput } from './createUserLike.admin.input';
export interface UpdateUserLikeAdminInput
    extends Partial<CreateUserLikeAdminInput> {
    originID: string;
}
