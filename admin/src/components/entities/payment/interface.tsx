import { DummyProductColumn } from '../product/interface';
import { DummyUserColumn } from '../user/interface';

const now = new Date();
// prettier-ignore
export const DummyPaymentColumn = {
    id: '', impUid: '', merchantUid: '',
    amount: 0, status: '', createAt: now, 
    user: DummyUserColumn, product: DummyProductColumn,
    userId: '', productId: '',
};
export type IPaymentColumn = typeof DummyPaymentColumn;
