import { EntityFactory } from '../entity_factory';
import { DummyFile, DummyFileColumn, IFileColumn } from './interface';

// prettier-ignore
export const FileIndex = EntityFactory.getEntity<IFileColumn>({
    name: '파일',
    dummyData: DummyFileColumn,
    beURL: '/api/admin/file',
    baseURL: '/admin/entity/file',
    list: {
        column: ['id', 'name', 'path', 'url', 'createAt'],
    },
    show: {
        column: ['id', 'name', 'path', 'url', 'createAt', 'deleteAt'],
    },
    edit: {
        column: ["files"],
        default: {
            files: [DummyFile]
        }
    }
});
