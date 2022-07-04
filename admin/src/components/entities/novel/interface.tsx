import { getDefaultDate } from '../../../functions/functions';
import { DummyUserColumn } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const DummyNovelColumn = {
    id: '', title: '', subtitle: '', description: '',
    likeCount: 0, createAt: now, updateAt: now, deleteAt: now,
    user: DummyUserColumn
};
export type INovelColumn = typeof DummyNovelColumn;
