import { EntityFactory } from '../entity_factory';
import { IBoardColumn, DummyBoardColumn } from './interface';

// prettier-ignore
export const BoardIndex = EntityFactory.getEntity<IBoardColumn>({
    name: '게시판',
    dummyData: DummyBoardColumn,
    beURL: '/api/admin/board',
    baseURL: '/admin/entity/board',
    list: {
        column: [
            'id', 'user', 'title', 'contents', 'likeCount', 'dislikeCount',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email'
        }
    },
    show: {
        column: [
            'id', 'user', 'title', 'contents', 
            'likeCount', 'dislikeCount', 'comments',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            comments: 'contents'
        }
    }
});
