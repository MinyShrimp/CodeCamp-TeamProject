import { EntityFactory } from '../entity_factory';
import { IPointPaymentColumn, DummyPointPaymentColumn } from './interface';

// prettier-ignore
export const PointPaymentIndex = EntityFactory.getEntity<IPointPaymentColumn>({
    name: '포인트 결제',
    dummyData: DummyPointPaymentColumn,
    beURL: '/api/admin/payment-point',
    baseURL: '/admin/entity/pointPayment',
    list: {
        column: [
            'id', 'point', 'createAt', 'status',
            'user', 'novel', 'novelIndex',
        ],
        option: {
            user: 'email',
            status: 'id',
            novel: 'title',
            novelIndex: 'title'
        }
    },
    show: {
        column: [
            'id', 'point', 'createAt', 'status',
            'user', 'novel', 'novelIndex',
        ],
        option: {
            user: 'email',
            status: 'id',
            novel: 'title',
            novelIndex: 'title'
        }
    },
});
