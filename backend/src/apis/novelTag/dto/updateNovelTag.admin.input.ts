import { CreateNovelTagAdminInput } from './createNovelTag.admin.input';
export interface UpdateNovelTagAdminInput
    extends Partial<CreateNovelTagAdminInput> {
    originID: string;
}
