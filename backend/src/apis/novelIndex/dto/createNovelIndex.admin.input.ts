import { NovelIndexEntity } from '../entities/novelIndex.entity';
export interface CreateNovelIndexAdminInput extends Omit<NovelIndexEntity, 'id'> {}
