import { EntityFactory } from '../entity_factory';
import { IUserColumn, DummyUserColumn } from './interface';

// prettier-ignore
export const UserIndex = EntityFactory.getEntity<IUserColumn>({
    name: '회원',
    dummyData: DummyUserColumn,
    beURL: '/api/admin/user',
    baseURL: '/admin/entity/user',
    list: {
        column: [
            'id', 'name', 'nickName', 
            'email', 'authEmail',
            'phone', 'authPhone', 
            'point', 'userClass',
            'loginAt', 'logoutAt', 'isLogin',
            'createAt', 'updateAt', 'deleteAt'
        ],
        option: {
            userClass: 'id',
            authEmail: 'isAuth',
            authPhone: 'isAuth',
        },
    },
    show: {
        column: [
            'id', 'name', 'nickName', 
            'email', 'authEmail',
            'phone', 'authPhone', 
            'point', 'userClass',
            'loginAt', 'logoutAt', 'isLogin',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            userClass: 'id',
            authEmail: 'isAuth',
            authPhone: 'isAuth',
        },
    },
    update: {
        column: [
            'name', 'email',
            'point', 'isLogin', 'userClassID'
        ],
        url: { 
            'userClassID': '/api/admin/user-class/names'
        },
        default: {
            name: '', email: '', 
            point: 0, isLogin: false, userClassID: ''
        }
    }
});
