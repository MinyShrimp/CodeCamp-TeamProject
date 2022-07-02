import React from 'react';
import { EntityFactory } from '../entity_factory';
import { DummyAuthorColumn, IAuthorColumn } from './interface';

// prettier-ignore
export const AuthorIndex = EntityFactory.getEntity<IAuthorColumn>({
    name: 'Author',
    dummyData: DummyAuthorColumn,
    list: {
        column: [
            'id', 'name', 'description', 
            'createAt', 'updateAt'
        ],
        url: '/admin/authors',
    },
    show: {
        column: [
            'id', 'name', 'description',
            'createAt', 'updateAt', 'deleteAt',
        ],
        url: '/admin/author'
    },
    edit: {
        column: [
            'name', 'description',
        ],
        url: { 'default': '/admin/author' },
        default: {
            name: '', description: ''
        }
    },
    update: {
        column: [
            'name', 'description',
        ],
        url: { 'default': '/admin/author' },
        default: {
            name: '', description: ''
        }
    }
});
