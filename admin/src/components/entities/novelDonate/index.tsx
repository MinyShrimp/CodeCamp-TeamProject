import { EntityFactory } from '../entity_factory';
import { INovelDonateColumn, DummyNovelDonateColumn } from './interface';

// prettier-ignore
export const NovelDonateIndex = EntityFactory.getEntity<INovelDonateColumn>({
    name: '후원작',
    dummyData: DummyNovelDonateColumn,
    beURL: '/admin/novel-donate',
    baseURL: '/admin/entity/novelDonate',
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
