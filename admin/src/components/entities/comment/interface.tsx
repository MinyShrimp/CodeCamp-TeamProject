import { getDefaultDate } from '../../../functions/functions';
import { SimpleDummyBoard } from '../board/interface';
import { SimpleDummyUser } from '../user/interface';

const now = getDefaultDate();

export const SimpleDummyComment = {
    id: '',
    contents: '',
};

// prettier-ignore
export const DummyCommentColumn = {
    ...SimpleDummyComment, likeCount: 0, dislikeCount: 0, 
    createAt: now, updateAt: now, deleteAt: now, 
    user: SimpleDummyUser, board: SimpleDummyBoard,
};
export type ICommentColumn = typeof DummyCommentColumn;
