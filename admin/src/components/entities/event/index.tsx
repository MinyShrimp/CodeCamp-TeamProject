import { getDefaultDate } from '../../../functions/functions';
import { EntityFactory } from '../entity_factory';
import { IEventColumn, DummyEventColumn } from './interface';

const now = getDefaultDate();

// prettier-ignore
export const EventIndex = EntityFactory.getEntity<IEventColumn>({
    name: '이벤트',
    dummyData: DummyEventColumn,
    beURL: '/api/admin/event',
    baseURL: '/admin/entity/event',
    list: {
        column: [
            'id', 'title', 'contents', 
            'isEvent', 'startAt', 'endAt',
            'createAt', 'updateAt', 
        ],
    },
    show: {
        column: [
            'id', 'title', 'contents', 
            'isEvent', 'startAt', 'endAt',
            'createAt', 'updateAt', 
        ],
    },
    edit: {
        column: [
            'title', 'contents', 
            'isEvent', 'startAt', 'endAt',
        ],
        default: {
            title: '', contents: '', isEvent: false,
            startAt: now, endAt: now,
        }
    },
    update: {
        column: [
            'title', 'contents', 
            'isEvent', 'startAt', 'endAt',
        ],
        default: {
            title: '', contents: '', isEvent: false,
            startAt: now, endAt: now,
        }
    }
});
