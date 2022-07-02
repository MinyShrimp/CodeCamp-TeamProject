import React from 'react';
import { getDefaultDate } from '../../../functions/functions';
import { DummyAuthorColumn } from '../author/interface';
import { EntityFactory } from '../entity_factory';
import { DummyPublisherColumn } from '../publisher/interface';
import { DummyBookColumn, IBookColumn } from './interface';

// prettier-ignore
export const BookIndex = EntityFactory.getEntity<IBookColumn>({
    name: 'Book',
    dummyData: DummyBookColumn,
    list: {
        column: [
            'id', 'title', 'subtitle', 'description',
            'page', 'isbn_10', 'isbn_13', 'publishAt',
            'publisher', 'author',
            'createAt', 'updateAt', 
        ],
        option: {
            'author': 'name',
            'publisher': 'name',
        },
        url: '/admin/books',
    },
    show: {
        column: [
            'id', 'title', 'subtitle', 'description',
            'page', 'isbn_10', 'isbn_13', 'publishAt',
            'publisher', 'author', 'book_images',
            'createAt', 'updateAt', 'deleteAt', 
        ],
        option: {
            'author': 'name',
            'publisher': 'name',
        },
        url: '/admin/book',
    },
    edit: {
        column: [
            'title', 'subtitle', 'description',
            'page', 'isbn_10', 'isbn_13', 'publishAt',
            'publisherID', 'authorID', 'files'
        ],
        url: { 
            'default': '/admin/book',
            'authorID': '/admin/author/names',
            'publisherID': '/admin/publisher/names',
        },
        default: {
            title: '', subtitle: '', description: '',
            page: 0, isbn_10: '', isbn_13: '', publishAt: getDefaultDate(),
            publisherID: '', authorID: '', files: []
        },
    },
    update: {
        column: [
            'title', 'subtitle', 'description',
            'page', 'isbn_10', 'isbn_13', 'publishAt',
            'publisherID', 'authorID',
        ],
        url: { 
            'default': '/admin/book',
            'authorID': '/admin/author/names',
            'publisherID': '/admin/publisher/names',
        },
        default: {
            title: '', subtitle: '', description: '',
            page: 0, isbn_10: '', isbn_13: '', publishAt: getDefaultDate(),
            publisherID: '', authorID: ''
        },
    },
});
