import { NovelTagEntity } from '../entities/novelTag.entity';
export interface CreateNovelTagAdminInput extends Omit<NovelTagEntity, 'id'> {}
