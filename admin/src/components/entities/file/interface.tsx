import { getDefaultDate } from '../../../functions/functions';

export const DummyFile = {
    file: '',
    fileName: '',
};
export type IFile = typeof DummyFile;

// prettier-ignore
export const DummyFileColumn = {
    id: '', name: '', path: '', url: '',
    createAt: getDefaultDate(), deleteAt: getDefaultDate(),
    files: [DummyFile]
};
export type IFileColumn = typeof DummyFileColumn;
