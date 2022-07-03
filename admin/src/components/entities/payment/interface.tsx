import { getDefaultDate } from '../../../functions/functions';
import { DummyPaymentStatusColumn } from '../payment_status/interface';
import { DummyProductColumn } from '../product/interface';
import { DummyUserColumn } from '../user/interface';

// prettier-ignore
export const DummyPaymentColumn = {
    id: '', impUid: '', merchantUid: '',
    amount: 0, createAt: getDefaultDate(), 
    user: DummyUserColumn, product: DummyProductColumn, status: DummyPaymentStatusColumn
};
export type IPaymentColumn = typeof DummyPaymentColumn;
