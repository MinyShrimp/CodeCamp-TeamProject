import { EntityFactory } from '../entity_factory';
import {
    IPointPaymentStatusColumn,
    DummyPointPaymentStatusColumn,
} from './interface';

// prettier-ignore
export const PointPaymentStatusIndex = EntityFactory.getEntity<IPointPaymentStatusColumn>({
    name: '포인트 결제 상태',
    dummyData: DummyPointPaymentStatusColumn,
    beURL: '/api/admin/payment-point-status',
    baseURL: '/admin/entity/pointPaymentStatus',
    list: {
        column: [ 'id', 'description' ],
    },
    show: {
        column: [ 'id', 'description' ],
    },
    edit: {
        column: [ 'id', 'description' ],
        default: { id: '', description: '' }
    },
    update: {
        column: [ 'id', 'description' ],
        default: { id: '', description: '' }
    }
});
