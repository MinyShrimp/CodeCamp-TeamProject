import { DummyAuthorColumn } from '../author/interface';
import { DummyFile } from '../file/interface';
import { DummyPublisherColumn } from '../publisher/interface';

const now = new Date();
// prettier-ignore
export const DummyBookColumn = {
    id: '', title: '', subtitle: '', description: '',
    page: 0, isbn_10: '', isbn_13: '', publishAt: now,
    createAt: now, updateAt: now, deleteAt: now,
    publisher: DummyPublisherColumn, publisherID: '',
    author: DummyAuthorColumn, authorID: '',
    files: [DummyFile], book_images: []
};
export type IBookColumn = typeof DummyBookColumn;
