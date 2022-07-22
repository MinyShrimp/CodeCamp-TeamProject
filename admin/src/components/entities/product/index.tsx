import { EntityFactory } from '../entity_factory';
import { IProductColumn, DummyProductColumn } from './interface';

// prettier-ignore
export const ProductIndex = EntityFactory.getEntity<IProductColumn>({
    name: '상품',
    dummyData: DummyProductColumn,
    beURL: '/api/admin/product',
    baseURL: '/admin/entity/product',
    list: {
        column: [
            'id', 'name', 'description', 'price', 'point',
        ],
    },
    show: {
        column: [
            'id', 'name', 'description', 'price', 'point',
        ],
    },
    edit: {
        column: [
            'name', 'price', 'point', 'description',
        ],
        default: {
            name: '', price: 0, point: 0, description: ''
        }
    },
    update: {
        column: [
            'name', 'price', 'point', 'description',
        ],
        default: {
            name: '', price: 0, point: 0, description: ''
        }
    }
});
