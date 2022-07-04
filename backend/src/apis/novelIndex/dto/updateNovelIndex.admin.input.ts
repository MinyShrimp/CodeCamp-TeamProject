import { CreateNovelIndexAdminInput } from './createNovelIndex.admin.input';
export interface UpdateNovelIndexAdminInput
    extends Partial<CreateNovelIndexAdminInput> {
    originID: string;
}
