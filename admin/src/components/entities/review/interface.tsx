import { getDefaultDate } from '../../../functions/functions';
import { DummyProductColumn } from '../product/interface';
import { DummyUserColumn } from '../user/interface';

const now = getDefaultDate();
// prettier-ignore
export const DummyReviewColumn = {
    id: '', contents: '', star: 0.0, like: true, 
    createAt: now, updateAt: now, deleteAt: now,
    product: DummyProductColumn, user: DummyUserColumn,
    productID: '', userID: ''
};
export type IReviewColumn = typeof DummyReviewColumn;
