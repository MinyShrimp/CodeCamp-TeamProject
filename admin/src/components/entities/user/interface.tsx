import { getDefaultDate } from '../../../functions/functions';
import { DummyUserClassColumn } from '../user_class/interface';

const now = getDefaultDate();
// prettier-ignore
export const DummyUserColumn = {
    id: '', nickName: '', name: '', email: '', 
    phone: '', pwd: '', point: 0, 
    loginAt: now, logoutAt: now, isLogin: false,
    createAt: now, updateAt: now, deleteAt: now,
    userClass: DummyUserClassColumn, userClassID: '',
    authPhone: { id: '', isAuth: false },
    authEmail: { id: '', isAuth: false },
};
export type IUserColumn = typeof DummyUserColumn;
