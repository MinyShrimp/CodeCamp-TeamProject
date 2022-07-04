import { BookmarkEntity } from '../entities/bookmark.entity';
export interface CreateBookmarkAdminInput extends Omit<BookmarkEntity, 'id'> {}
