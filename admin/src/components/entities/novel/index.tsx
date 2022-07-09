import { EntityFactory } from '../entity_factory';
import { INovelColumn, DummyNovelColumn } from './interface';

// prettier-ignore
export const NovelIndex = EntityFactory.getEntity<INovelColumn>({
    name: '소설',
    dummyData: DummyNovelColumn,
    beURL: '/admin/novel',
    baseURL: '/admin/entity/novel',
    list: {
        column: [
            'id', 'user', 'title', 'subtitle', 'description', 'novelCategory',
            'likeCount', 'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            novelCategory: 'name',
        }
    },
    show: {
        column: [
            'id', 'user', 'title', 'subtitle', 'description', 'likeCount',
            'novelCategory', 'novelTags', 'novelIndexs', 'novelReviews',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            novelTags: 'name',
            novelIndexs: 'title',
            novelCategory: 'name',
            novelReviews: 'contents',
        }
    },
});
