import { CreateNovelAdminInput } from './createNovel.admin.input';
export interface UpdateNovelAdminInput
    extends Partial<CreateNovelAdminInput> {
    originID: string;
}
