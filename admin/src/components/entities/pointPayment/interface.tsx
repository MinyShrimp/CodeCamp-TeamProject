import { getDefaultDate } from '../../../functions/functions';
import { SimpleDummyNovelIndex } from '../novelIndex/interface';
import { DummyPointPaymentStatusColumn } from '../pointPaymentStatus/interface';
import { SimpleDummyUser } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const DummyPointPaymentColumn = {
    id: '', point: 0, createAt: now,
    status: DummyPointPaymentStatusColumn, 
    user: SimpleDummyUser, novelIndex: SimpleDummyNovelIndex
};
export type IPointPaymentColumn = typeof DummyPointPaymentColumn;
