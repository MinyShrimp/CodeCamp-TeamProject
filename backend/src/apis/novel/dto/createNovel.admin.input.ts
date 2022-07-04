import { NovelEntity } from '../entities/novel.entity';
export interface CreateNovelAdminInput extends Omit<NovelEntity, 'id'> {}
