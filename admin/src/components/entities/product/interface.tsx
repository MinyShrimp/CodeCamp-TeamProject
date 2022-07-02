import { DummyBookColumn } from '../book/interface';
import { DummyProductCategoryColumn } from '../productCategory/interface';
import { DummyProductTagColumn } from '../productTag/interface';

const now = new Date();
// prettier-ignore
export const DummyProductColumn = {
    id: '', name: '', url: '', stock_count: 0, selling_count: 0,
    price: 0, createAt: now, updateAt: now, deleteAt: now,
    book: DummyBookColumn, 
    bookID: '', 
    productCategory: DummyProductCategoryColumn,
    categoryID: '',
    productTags: [DummyProductTagColumn],
    productTagsInput: ''
};
export type IProductColumn = typeof DummyProductColumn;
