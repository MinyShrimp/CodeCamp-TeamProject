import { EntityFactory } from '../entity_factory';
import { IPaymentStatusColumn, DummyPaymentStatusColumn } from './interface';

// prettier-ignore
export const PaymentStatusIndex = EntityFactory.getEntity<IPaymentStatusColumn>({
    name: '결제 상태',
    dummyData: DummyPaymentStatusColumn,
    baseURL: '/admin/entity/paymentStatus',
    beURL: '/admin/payment-status',
    list: {
        column: [
            'id', 'description',
        ],
    },
    show: {
        column: [
            'id', 'description',
        ],
    },
    edit: {
        column: [
            'id', 'description',
        ],
        default: {
            id: '', description: ''
        }
    },
    update: {
        column: [
            'id', 'description',
        ],
        default: {
            id: '', description: ''
        }
    }
});
