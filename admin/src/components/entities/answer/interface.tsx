import { getDefaultDate } from '../../../functions/functions';
import { DummyQuestionColumn } from '../question/interface';
import { DummyUserColumn } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const DummyAnswerColumn = {
    id: '', title: '', contents: '', star: 0,
    createAt: now, updateAt: now, deleteAt: now,
    user: DummyUserColumn, question: DummyQuestionColumn,
    questionID: '',
};
export type IAnswerColumn = typeof DummyAnswerColumn;
