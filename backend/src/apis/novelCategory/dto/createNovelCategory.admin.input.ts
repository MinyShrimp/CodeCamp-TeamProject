import { NovelCategoryEntity } from '../entities/novelCategory.entity';
export interface CreateNovelCategoryAdminInput extends Omit<NovelCategoryEntity, 'id'> {}
