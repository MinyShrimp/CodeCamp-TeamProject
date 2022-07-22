import { EntityFactory } from '../entity_factory';
import { IQuestionColumn, DummyQuestionColumn } from './interface';

// prettier-ignore
export const QuestionIndex = EntityFactory.getEntity<IQuestionColumn>({
    name: '문의',
    dummyData: DummyQuestionColumn,
    beURL: '/api/admin/question',
    baseURL: '/admin/entity/question',
    list: {
        column: [
            'id', 'title', 'contents', 'user',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email'
        }
    },
    show: {
        column: [
            'id', 'title', 'contents', 'user',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email'
        }
    },
});
