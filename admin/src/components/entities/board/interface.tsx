import { getDefaultDate } from '../../../functions/functions';
import { SimpleDummyComment } from '../comment/interface';
import { SimpleDummyUser } from '../user/interface';

const now = getDefaultDate();

export const SimpleDummyBoard = {
    id: '',
    title: '',
};

// prettier-ignore
export const DummyBoardColumn = {
    ...SimpleDummyBoard, contents: '', likeCount: 0, dislikeCount: 0,
    createAt: now, updateAt: now, deleteAt: now,
    user: SimpleDummyUser, comments: [SimpleDummyComment],
};
export type IBoardColumn = typeof DummyBoardColumn;
