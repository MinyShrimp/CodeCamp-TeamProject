import { getDefaultDate } from '../../../functions/functions';

const now = getDefaultDate();

// prettier-ignore
export const DummyNoticeColumn = {
    id: '', title: '', contents: '', isTop: false, 
    createAt: now, updateAt: now, deleteAt: now,
};
export type INoticeColumn = typeof DummyNoticeColumn;
