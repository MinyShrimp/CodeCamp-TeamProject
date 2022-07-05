import { EntityFactory } from '../entity_factory';
import { INovelLikeColumn, DummyNovelLikeColumn } from './interface';

// prettier-ignore
export const NovelLikeIndex = EntityFactory.getEntity<INovelLikeColumn>({
    name: '선호작',
    dummyData: DummyNovelLikeColumn,
    beURL: '/admin/novel-like',
    baseURL: '/admin/entity/novelLike',
    list: {
        column: [
            'id', 'user', 'novel', 'createAt',
        ],
        option: {
            user: 'email', novel: 'title',
        }
    },
    show: {
        column: [
            'id', 'user', 'novel', 'createAt',
        ],
        option: {
            user: 'email', novel: 'title',
        }
    },
});
