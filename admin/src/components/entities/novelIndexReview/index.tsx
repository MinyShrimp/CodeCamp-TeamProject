import { EntityFactory } from '../entity_factory';
import {
    INovelIndexReviewColumn,
    DummyNovelIndexReviewColumn,
} from './interface';

// prettier-ignore
export const NovelIndexReviewIndex = EntityFactory.getEntity<INovelIndexReviewColumn>({
    name: '편당 리뷰',
    dummyData: DummyNovelIndexReviewColumn,
    beURL: '/api/admin/novel-index-review',
    baseURL: '/admin/entity/novelIndexReview',
    list: {
        column: [
            'id', 'user', 'novelIndex', 'contents', 
            'likeCount', 'dislikeCount', 'star',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            novelIndex: 'title'
        }
    },
    show: {
        column: [
            'id', 'user', 'novelIndex', 'contents', 
            'likeCount', 'dislikeCount', 'star',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            novelIndex: 'title'
        }
    },
});
