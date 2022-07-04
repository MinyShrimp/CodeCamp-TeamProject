import { getDefaultDate } from '../../../functions/functions';
import { SimpleDummyNovel } from '../novel/interface';
import { SimpleDummyUser } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const DummyNovelLikeColumn = {
    id: '', createAt: now, 
    user: SimpleDummyUser, novel: SimpleDummyNovel,
};
export type INovelLikeColumn = typeof DummyNovelLikeColumn;
