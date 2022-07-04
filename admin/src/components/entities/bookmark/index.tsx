import { EntityFactory } from '../entity_factory';
import { IBookmarkColumn, DummyBookmarkColumn } from './interface';

// prettier-ignore
export const BookmarkIndex = EntityFactory.getEntity<IBookmarkColumn>({
    name: '북마크',
    dummyData: DummyBookmarkColumn,
    beURL: '/admin/bookmark',
    baseURL: '/admin/entity/bookmark',
    list: {
        column: [
            'id', 'user', 'novel', 'page', 'createAt', 'deleteAt',
        ],
        option: {
            user: 'email', novel: 'title',
        }
    },
    show: {
        column: [
            'id', 'user', 'novel', 'page', 'createAt', 'deleteAt',
        ],
        option: {
            user: 'email', novel: 'title',
        }
    },
});
