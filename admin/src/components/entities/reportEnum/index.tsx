import { EntityFactory } from '../entity_factory';
import { IReportEnumColumn, DummyReportEnumColumn } from './interface';

// prettier-ignore
export const ReportEnumIndex = EntityFactory.getEntity<IReportEnumColumn>({
    name: '신고 ENUM',
    dummyData: DummyReportEnumColumn,
    beURL: '/api/admin/report-enum',
    baseURL: '/admin/entity/reportEnum',
    list: {
        column: [
            'id', 'table', 'description',
        ],
    },
    show: {
        column: [
            'id', 'table', 'description',
        ],
    },
    edit: {
        column: [
            'id', 'table', 'description',
        ],
        default: {
            id: '', table: '', description: '',
        }
    },
    update: {
        column: [
            'id', 'table', 'description',
        ],
        default: {
            id: '', table: '', description: '',
        }
    }
});
