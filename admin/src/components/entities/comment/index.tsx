import { EntityFactory } from '../entity_factory';
import { ICommentColumn, DummyCommentColumn } from './interface';

// prettier-ignore
export const CommentIndex = EntityFactory.getEntity<ICommentColumn>({
    name: '게시판 댓글',
    dummyData: DummyCommentColumn,
    beURL: '/api/admin/comment',
    baseURL: '/admin/entity/comment',
    list: {
        column: [
            'id', 'user', 'board', 'contents', 
            'likeCount', 'dislikeCount',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            board: 'title',
        }
    },
    show: {
        column: [
            'id', 'user', 'board', 'contents', 
            'likeCount', 'dislikeCount',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            board: 'title',
        }
    }
});
