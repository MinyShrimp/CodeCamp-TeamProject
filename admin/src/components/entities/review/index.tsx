import { EntityFactory } from '../entity_factory';
import { IReviewColumn, DummyReviewColumn } from './interface';

// prettier-ignore
export const ReviewIndex = EntityFactory.getEntity<IReviewColumn>({
    name: 'Review',
    dummyData: DummyReviewColumn,
    list: {
        column: [
            'id', 'contents', 'star', 'like',
            'user', 'product', 
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: "email",
            product: "name",
        },
        url: '/admin/reviews'
    },
    show: {
        column: [
            'id', 'contents', 'star', 'like',
            'user', 'product', 
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: "email",
            product: "name",
        },
        url: '/admin/review'
    },
    edit: {
        column: [
            'contents', 'star', 'productID', 'userID',
        ],
        url: { 
            'default': '/admin/review',
            'productID': '/admin/product/names',
            'userID': '/admin/user/names',
        },
        default: {
            contents: '', star: 0.0, productID: '', userID: '',
        }
    },
    update: {
        column: [
            'contents', 'star', 'productID', 'userID',
        ],
        url: { 
            'default': '/admin/review',
            'productID': '/admin/product/names',
            'userID': '/admin/user/names',
        },
        default: {
            contents: '', star: 0.0, productID: '', userID: '',
        }
    }
});
