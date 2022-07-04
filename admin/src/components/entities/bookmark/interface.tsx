import { getDefaultDate } from '../../../functions/functions';
import { SimpleDummyNovel } from '../novel/interface';
import { SimpleDummyUser } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const DummyBookmarkColumn = {
    id: '', page: 0, createAt: now, deleteAt: now,
    user: SimpleDummyUser, novel: SimpleDummyNovel,
};
export type IBookmarkColumn = typeof DummyBookmarkColumn;
