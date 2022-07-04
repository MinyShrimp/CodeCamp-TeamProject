import { CreateBookmarkAdminInput } from './createBookmark.admin.input';
export interface UpdateBookmarkAdminInput
    extends Partial<CreateBookmarkAdminInput> {
    originID: string;
}
