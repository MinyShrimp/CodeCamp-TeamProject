import { getDefaultDate } from '../../../functions/functions';

import { SimpleDummyUser } from '../user/interface';
import { SimpleDummyNovel } from '../novel/interface';
import { SimpleDummyNovelIndexReview } from '../novelIndexReview/interface';

const now = getDefaultDate();

// prettier-ignore
export const SimpleDummyNovelIndex = {
    id: '', title: '',
};

// prettier-ignore
export const DummyNovelIndexColumn = {
    ...SimpleDummyNovelIndex, contents: '', index: 1,
    star: '', createAt: now, updateAt: now, deleteAt: now,
    user: SimpleDummyUser, 
    novel: SimpleDummyNovel,
    novelIndexReviews: [SimpleDummyNovelIndexReview],
};
export type INovelIndexColumn = typeof DummyNovelIndexColumn;
