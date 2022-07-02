import React from 'react';
import { DummyBookColumn } from '../book/interface';
import { EntityFactory } from '../entity_factory';
import { DummyFileColumn } from '../file/interface';
import { DummyBookImageColumn, IBookImageColumn } from './interface';

// prettier-ignore
export const BookImageIndex = EntityFactory.getEntity<IBookImageColumn>({
    name: 'Book Image',
    dummyData: DummyBookImageColumn,
    list: {
        column: ['id', 'isMain', 'book', 'file'],
        option: {
            'book': 'title',
            'file': 'url'
        },
        url: '/admin/book-images',
    },
    show: {
        column: ['id', 'isMain', 'book', 'file', 'deleteAt'],
        option: {
            'book': 'title',
            'file': 'url'
        },
        url: '/admin/book-image',
    },
});
