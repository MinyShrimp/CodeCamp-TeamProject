import { getDefaultDate } from '../../../functions/functions';
import { DummyUserColumn } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const DummyQuestionColumn = {
    id: '', title: '', contents: '', 
    createAt: now, updateAt: now, deleteAt: now,
    user: DummyUserColumn,
};
export type IQuestionColumn = typeof DummyQuestionColumn;
