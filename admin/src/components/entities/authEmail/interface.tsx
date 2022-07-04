import { getDefaultDate } from '../../../functions/functions';
import { DummyUserColumn } from '../user/interface';

const now = getDefaultDate();

// prettier-ignore
export const DummyEmailColumn = {
    id: '', email: '', token: '', isAuth: false,
    createAt: now, updateAt: now, 
    user: DummyUserColumn,
};
export type IEmailColumn = typeof DummyEmailColumn;
