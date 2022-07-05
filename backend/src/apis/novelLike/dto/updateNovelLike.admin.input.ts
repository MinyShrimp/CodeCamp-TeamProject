import { CreateNovelLikeAdminInput } from './createNovelLike.admin.input';
export interface UpdateNovelLikeAdminInput
    extends Partial<CreateNovelLikeAdminInput> {
    originID: string;
}
