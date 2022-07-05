import { EntityFactory } from '../entity_factory';
import { INovelCategoryColumn, DummyNovelCategoryColumn } from './interface';

// prettier-ignore
export const NovelCategoryIndex = EntityFactory.getEntity<INovelCategoryColumn>({
    name: '소설 카테고리',
    dummyData: DummyNovelCategoryColumn,
    beURL: '/admin/novel-category',
    baseURL: '/admin/entity/novelCategory',
    list: {
        column: [ 'id', 'name' ],
    },
    show: {
        column: [ 'id', 'name' ],
    },
    edit: {
        column: [ 'name' ],
        default: { name: '' }
    },
    update: {
        column: [ 'name' ],
        default: { name: '' }
    }
});
