import { DummyBookColumn } from '../book/interface';
import { DummyFileColumn } from '../file/interface';

const now = new Date();
// prettier-ignore
export const DummyBookImageColumn = {
    id: '',
    isMain: true,
    deleteAt: now,
    book: DummyBookColumn,
    file: DummyFileColumn,
};
export type IBookImageColumn = typeof DummyBookImageColumn;
