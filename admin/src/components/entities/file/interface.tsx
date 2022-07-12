import { getDefaultDate } from '../../../functions/functions';

export const DummyFile = {
    file: '',
    fileName: '',
};
export type IFile = typeof DummyFile;

export const SimpleDummyFile = {
    id: '',
    url: '',
};

// prettier-ignore
export const DummyFileColumn = {
    ...SimpleDummyFile, name: '', path: '', 
    createAt: getDefaultDate(), deleteAt: getDefaultDate(),
    files: [DummyFile]
};
export type IFileColumn = typeof DummyFileColumn;
