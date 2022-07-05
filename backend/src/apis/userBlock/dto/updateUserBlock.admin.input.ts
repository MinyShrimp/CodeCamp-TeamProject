import { CreateUserBlockAdminInput } from './createUserBlock.admin.input';
export interface UpdateUserBlockAdminInput
    extends Partial<CreateUserBlockAdminInput> {
    originID: string;
}
