import { CreateNovelReviewAdminInput } from './createNovelReview.admin.input';
export interface UpdateNovelReviewAdminInput
    extends Partial<CreateNovelReviewAdminInput> {
    originID: string;
}
