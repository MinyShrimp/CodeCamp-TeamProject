import { getDefaultDate } from '../../../functions/functions';

const now = getDefaultDate();

// prettier-ignore
export const DummyEventColumn = {
    id: '', title: '', contents: '', 
    isEvent: false, startAt: now, endAt: now,
    createAt: now, updateAt: now,
};
export type IEventColumn = typeof DummyEventColumn;
