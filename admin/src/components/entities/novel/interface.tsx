import { getDefaultDate } from '../../../functions/functions';

import { SimpleDummyUser } from '../user/interface';
import { SimpleDummyNovelTag } from '../novelTag/interface';
import { SimpleDummyNovelReview } from '../novelReview/interface';
import { SimpleDummyNovelIndex } from '../novelIndex/interface';
import { DummyNovelCategoryColumn } from '../novelCategory/interface';
import { SimpleDummyFile } from '../file/interface';

const now = getDefaultDate();

// prettier-ignore
export const SimpleDummyNovel = {
    id: '', title: '',
};

// prettier-ignore
export const DummyNovelColumn = {
    ...SimpleDummyNovel, description: '',
    likeCount: 0, createAt: now, updateAt: now, deleteAt: now,
    user: SimpleDummyUser, 
    novelCategory: DummyNovelCategoryColumn,
    novelTags: [SimpleDummyNovelTag],
    novelIndexs: [SimpleDummyNovelIndex],
    novelReviews: [SimpleDummyNovelReview],
    files: [SimpleDummyFile],
};
export type INovelColumn = typeof DummyNovelColumn;
