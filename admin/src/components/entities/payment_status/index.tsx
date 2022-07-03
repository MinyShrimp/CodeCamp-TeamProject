import { EntityFactory } from '../entity_factory';
import { IPaymentStatusColumn, DummyPaymentStatusColumn } from './interface';

// prettier-ignore
export const PaymentStatusIndex = EntityFactory.getEntity<IPaymentStatusColumn>({
    name: '결제 상태',
    dummyData: DummyPaymentStatusColumn,
    baseURL: '/admin/entity/paymentStatus',
    list: {
        column: [
            'id', 'description',
        ],
        url: '/admin/payment-status/all'
    },
    show: {
        column: [
            'id', 'description',
        ],
        url: '/admin/payment-status'
    },
    edit: {
        column: [
            'id', 'description',
        ],
        url: { 'default': '/admin/payment-status' },
        default: {
            id: '', description: ''
        }
    },
    update: {
        column: [
            'id', 'description',
        ],
        url: { 'default': '/admin/payment-status' },
        default: {
            id: '', description: ''
        }
    }
});
