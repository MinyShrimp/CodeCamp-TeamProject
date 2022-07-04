import { CreateNovelIndexReviewAdminInput } from './createNovelIndexReview.admin.input';
export interface UpdateNovelIndexReviewAdminInput
    extends Partial<CreateNovelIndexReviewAdminInput> {
    originID: string;
}
