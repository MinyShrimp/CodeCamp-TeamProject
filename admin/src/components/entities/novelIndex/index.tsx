import { EntityFactory } from '../entity_factory';
import { INovelIndexColumn, DummyNovelIndexColumn } from './interface';

// prettier-ignore
export const NovelIndexIndex = EntityFactory.getEntity<INovelIndexColumn>({
    name: '소설 인덱스',
    dummyData: DummyNovelIndexColumn,
    beURL: '/admin/novel-index',
    baseURL: '/admin/entity/novelIndex',
    list: {
        column: [
            'id', 'novel', 'index', 'title', 'contents', 
            'star', 'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            novel: 'title'
        }
    },
    show: {
        column: [
            'id', 'novel', 'index', 'title', 'contents', 
            'star', 'novelIndexReviews', 'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            novel: 'title',
            novelIndexReviews: 'contents',
        }
    }
});
