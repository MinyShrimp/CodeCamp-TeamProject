import { EntityFactory } from '../entity_factory';
import { IReportColumn, DummyReportColumn } from './interface';

// prettier-ignore
export const ReportIndex = EntityFactory.getEntity<IReportColumn>({
    name: '신고',
    dummyData: DummyReportColumn,
    beURL: '/admin/report',
    baseURL: '/admin/entity/report',
    list: {
        column: [
            'id', 'title', 'contents', 'reportUUID',
            'user', 'enum', 'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            enum: 'id'
        }
    },
    show: {
        column: [
            'id', 'title', 'contents', 'reportUUID',
            'user', 'enum', 'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            user: 'email',
            enum: 'id'
        }
    }
});
