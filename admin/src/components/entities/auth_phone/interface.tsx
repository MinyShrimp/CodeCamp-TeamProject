import { getDefaultDate } from '../../../functions/functions';
import { DummyUserColumn } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const DummyPhoneColumn = {
    id: '', phone: '', token: '', isAuth: false,
    createAt: now, updateAt: now, 
    user: DummyUserColumn,
};
export type IPhoneColumn = typeof DummyPhoneColumn;
