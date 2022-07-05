import { getDefaultDate } from '../../../functions/functions';
import { SimpleDummyUser } from '../user/interface';
const now = getDefaultDate();

// prettier-ignore
export const DummyUserLikeColumn = {
    id: '', createAt: now, 
    from: SimpleDummyUser, to: SimpleDummyUser,
};
export type IUserLikeColumn = typeof DummyUserLikeColumn;
