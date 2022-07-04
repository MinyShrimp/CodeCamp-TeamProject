import { getDefaultDate } from '../../../functions/functions';
import { SimpleDummyNovelIndex } from '../novelIndex/interface';
import { SimpleDummyUser } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const SimpleDummyNovelIndexReview = {
    id: '', contents: '',
};

// prettier-ignore
export const DummyNovelIndexReviewColumn = {
    ...SimpleDummyNovelIndexReview, 
    likeCount: 0, dislikeCount: 0, star: 0,
    startAt: now, updateAt: now, deleteAt: now,
    user: SimpleDummyUser, novelIndex: SimpleDummyNovelIndex,
};
export type INovelIndexReviewColumn = typeof DummyNovelIndexReviewColumn;
