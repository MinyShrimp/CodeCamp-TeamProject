import { EntityFactory } from '../entity_factory';
import { IPaymentColumn, DummyPaymentColumn } from './interface';

// prettier-ignore
export const PaymentIndex = EntityFactory.getEntity<IPaymentColumn>({
    name: '결제 정보',
    dummyData: DummyPaymentColumn,
    beURL: '/api/admin/payment',
    baseURL: '/admin/entity/payment',
    list: {
        column: [
            'id', 'impUid', 'merchantUid', 'amount', 
            'user', 'product', 'status', 'createAt',
        ],
        option: {
            user: 'email',
            status: 'id',
            product: 'name',
        },
    },
    show: {
        column: [
            'id', 'impUid', 'merchantUid', 'amount', 
            'user', 'product', 'status', 'createAt',
        ],
        option: {
            user: 'email',
            status: 'id',
            product: 'name',
        },
    }
});
