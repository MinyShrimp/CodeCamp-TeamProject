import { EntityFactory } from '../entity_factory';
import { DummyEmailColumn, IEmailColumn } from './interface';

// prettier-ignore
export const EmailIndex = EntityFactory.getEntity<IEmailColumn>({
    name: '이메일 인증',
    dummyData: DummyEmailColumn,
    baseURL: '/admin/entity/authEmail',

    list: {
        column: [
            'id', 'user', 'email', 'token', 
            'isAuth', 'createAt', 'updateAt',
        ],
        option: {
            user: 'email',
        },
        url: '/admin/emails',
    },
    show: {
        column: [
            'id', 'user', 'email', 'token', 
            'isAuth', 'createAt', 'updateAt',
        ],
        option: {
            user: 'email',
        },
        url: '/admin/email',
    },
});
