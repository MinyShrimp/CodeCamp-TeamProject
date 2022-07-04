import { getDefaultDate } from '../../../functions/functions';
import { SimpleDummyNovel } from '../novel/interface';
import { SimpleDummyUser } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const SimpleDummyNovelReview = {
    id: '', contents: '',
};

// prettier-ignore
export const DummyNovelReviewColumn = {
    ...SimpleDummyNovelReview,
    likeCount: 0, dislikeCount: 0, star: 0,
    createAt: now, updateAt: now, deleteAt: now,
    user: SimpleDummyUser, novel: SimpleDummyNovel
};
export type INovelReviewColumn = typeof DummyNovelReviewColumn;
