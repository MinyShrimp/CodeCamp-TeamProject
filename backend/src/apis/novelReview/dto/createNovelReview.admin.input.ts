import { NovelReviewEntity } from '../entities/novelReview.entity';
export interface CreateNovelReviewAdminInput extends Omit<NovelReviewEntity, 'id'> {}
