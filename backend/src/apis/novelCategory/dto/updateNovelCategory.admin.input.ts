import { CreateNovelCategoryAdminInput } from './createNovelCategory.admin.input';
export interface UpdateNovelCategoryAdminInput
    extends Partial<CreateNovelCategoryAdminInput> {
    originID: string;
}
