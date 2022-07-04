import { EntityFactory } from '../entity_factory';
import { INovelReviewColumn, DummyNovelReviewColumn } from './interface';

// prettier-ignore
export const NovelReviewIndex = EntityFactory.getEntity<INovelReviewColumn>({
    name: '소설 리뷰',
    dummyData: DummyNovelReviewColumn,
    beURL: '/admin/novel-review',
    baseURL: '/admin/entity/novel-review',
    list: {
        column: [
            'id', 'user', 'novel', 'contents', 
            'likeCount', 'dislikeCount', 'star',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            novel: 'title'
        }
    },
    show: {
        column: [
            'id', 'user', 'novel', 'contents', 
            'likeCount', 'dislikeCount', 'star',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            novel: 'title'
        }
    },
});
