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
            'id', 'user', 'title', 'subtitle', 'description',
            'likeCount', 'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email'
        }
    },
    show: {
        column: [
            'id', 'user', 'title', 'subtitle', 'description',
            'likeCount', 'novelTags', 'novelIndexs', 'novelReviews',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            novelTags: 'name',
            novelIndexs: 'title',
            novelReviews: 'contents',
        }
    },
});
