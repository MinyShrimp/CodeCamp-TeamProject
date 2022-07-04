import { EntityFactory } from '../entity_factory';
import { IUserClassColumn, DummyUserClassColumn } from './interface';

// prettier-ignore
export const UserClassIndex = EntityFactory.getEntity<IUserClassColumn>({
    name: '회원 등급',
    dummyData: DummyUserClassColumn,
    baseURL: '/admin/entity/userClass',
    beURL: '/admin/user-class',
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
