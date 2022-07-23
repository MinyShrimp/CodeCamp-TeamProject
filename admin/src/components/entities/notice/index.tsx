import { EntityFactory } from '../entity_factory';
import { INoticeColumn, DummyNoticeColumn } from './interface';

// prettier-ignore
export const NoticeIndex = EntityFactory.getEntity<INoticeColumn>({
    name: '공지',
    dummyData: DummyNoticeColumn,
    beURL: '/api/admin/notice',
    baseURL: '/admin/entity/notice',
    list: {
        column: [
            'id', 'title', 'contents', 'isTop',
            'createAt', 'updateAt', 'deleteAt', 
        ],
    },
    show: {
        column: [
            'id', 'title', 'contents', 'isTop',
            'createAt', 'updateAt', 'deleteAt', 
        ],
    },
    edit: {
        column: [
            'title', 'contents', 'isTop'
        ],
        default: {
            title: '', contents: '', isTop: false
        }
    },
    update: {
        column: [
            'title', 'contents', 'isTop'
        ],
        default: {
            title: '', contents: '', isTop: false
        }
    }
});
