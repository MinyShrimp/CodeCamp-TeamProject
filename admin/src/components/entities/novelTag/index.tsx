import { EntityFactory } from '../entity_factory';
import { INovelTagColumn, DummyNovelTagColumn } from './interface';

// prettier-ignore
export const NovelTagIndex = EntityFactory.getEntity<INovelTagColumn>({
    name: '소설 태그',
    dummyData: DummyNovelTagColumn,
    beURL: '/admin/novel-tag',
    baseURL: '/admin/entity/novelTag',
    list: {
        column: [
            'id', 'name', 'createAt'
        ],
    },
    show: {
        column: [
            'id', 'name', 'createAt'
        ],
    },
});
