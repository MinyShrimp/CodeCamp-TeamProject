import { EntityFactory } from '../entity_factory';
import { IAnswerColumn, DummyAnswerColumn } from './interface';

// prettier-ignore
export const AnswerIndex = EntityFactory.getEntity<IAnswerColumn>({
    name: '답변',
    dummyData: DummyAnswerColumn,
    beURL: '/api/admin/answer',
    baseURL: '/admin/entity/answer',
    list: {
        column: [
            'id', 'title', 'contents', 'star',
            'question', 'user',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            question: 'title',
        }
    },
    show: {
        column: [
            'id', 'title', 'contents', 'star',
            'question', 'user',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            question: 'title',
        }
    },
    update: {
        column: [
            'title', 'contents'
        ],
        default: {
            title: '', contents: ''
        }
    }
});
