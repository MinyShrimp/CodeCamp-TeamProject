import { getDefaultDate } from '../../../functions/functions';

const now = getDefaultDate();
// prettier-ignore
export const DummyUserColumn = {
    id: '', name: '', email: '', phone: '', pwd: '', point: 0, isAdmin: false,
    loginAt: now, logoutAt: now, isLogin: false,
    createAt: now, updateAt: now, deleteAt: now,
};
export type IUserColumn = typeof DummyUserColumn;
