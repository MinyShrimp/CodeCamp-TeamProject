import { EntityFactory } from '../entity_factory';
import { IUserBlockColumn, DummyUserBlockColumn } from './interface';

// prettier-ignore
export const UserBlockIndex = EntityFactory.getEntity<IUserBlockColumn>({
    name: '차단 회원',
    dummyData: DummyUserBlockColumn,
    beURL: '/api/admin/userBlock',
    baseURL: '/admin/entity/userBlock',
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
