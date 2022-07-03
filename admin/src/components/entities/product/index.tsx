import { EntityFactory } from '../entity_factory';
import { IProductColumn, DummyProductColumn } from './interface';

// prettier-ignore
export const ProductIndex = EntityFactory.getEntity<IProductColumn>({
    name: '상품',
    dummyData: DummyProductColumn,
    baseURL: '/admin/entity/product',
    list: {
        column: [
            'id', 'name', 'description', 'price', 'point',
        ],
        url: '/admin/product/all'
    },
    show: {
        column: [
            'id', 'name', 'description', 'price', 'point',
        ],
        url: '/admin/product'
    },
    edit: {
        column: [
            'name', 'price', 'point', 'description',
        ],
        url: { 'default': '/admin/product' },
        default: {
            name: '', price: 0, point: 0, description: ''
        }
    },
    update: {
        column: [
            'name', 'price', 'point', 'description',
        ],
        url: { 'default': '/admin/product' },
        default: {
            name: '', price: 0, point: 0, description: ''
        }
    }
});
