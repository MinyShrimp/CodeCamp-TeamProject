import { NovelIndexReviewEntity } from '../entities/novelIndexReview.entity';
export interface CreateNovelIndexReviewAdminInput extends Omit<NovelIndexReviewEntity, 'id'> {}
