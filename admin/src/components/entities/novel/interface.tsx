import { getDefaultDate } from '../../../functions/functions';

import { SimpleDummyUser } from '../user/interface';
import { SimpleDummyNovelTag } from '../novelTag/interface';
import { SimpleDummyNovelReview } from '../novelReview/interface';
import { SimpleDummyNovelIndex } from '../novelIndex/interface';

const now = getDefaultDate();

// prettier-ignore
export const SimpleDummyNovel = {
    id: '', title: '',
};

// prettier-ignore
export const DummyNovelColumn = {
    ...SimpleDummyNovel, subtitle: '', description: '',
    likeCount: 0, createAt: now, updateAt: now, deleteAt: now,
    user: SimpleDummyUser, 
    novelTags: [SimpleDummyNovelTag],
    novelIndexs: [SimpleDummyNovelIndex],
    novelReviews: [SimpleDummyNovelReview],
};
export type INovelColumn = typeof DummyNovelColumn;
