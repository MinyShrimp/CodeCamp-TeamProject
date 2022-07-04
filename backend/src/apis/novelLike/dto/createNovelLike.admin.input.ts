import { NovelLikeEntity } from '../entities/novelLike.entity';
export interface CreateNovelLikeAdminInput extends Omit<NovelLikeEntity, 'id'> {}
