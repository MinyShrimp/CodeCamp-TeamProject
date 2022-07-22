import { EntityFactory } from '../entity_factory';
import { IUserLikeColumn, DummyUserLikeColumn } from './interface';

// prettier-ignore
export const UserLikeIndex = EntityFactory.getEntity<IUserLikeColumn>({
    name: '선호 작가',
    dummyData: DummyUserLikeColumn,
    beURL: '/api/admin/userLike',
    baseURL: '/admin/entity/userLike',
    list: {
        column: [
            'id', 'from', 'to', 'createAt',
        ],
        option: {
            to: 'email', from: 'email'
        }
    },
    show: {
        column: [
            'id', 'from', 'to', 'createAt',
        ],
        option: {
            to: 'email', from: 'email'
        }
    }
});
