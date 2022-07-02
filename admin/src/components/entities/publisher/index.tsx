import React from 'react';
import { EntityFactory } from '../entity_factory';
import { DummyPublisherColumn, IPublisherColumn } from './interface';

// prettier-ignore
export const PublisherIndex = EntityFactory.getEntity<IPublisherColumn>({
    name: 'Publisher',
    dummyData: DummyPublisherColumn,
    list: {
        column: [
            'id', 'name', 'description', 
            'createAt', 'updateAt'
        ],
        url: '/admin/publishers',
    },
    show: {
        column: [
            'id', 'name', 'description',
            'createAt', 'updateAt', 'deleteAt',
        ],
        url: '/admin/publisher'
    },
    edit: {
        column: [
            'name', 'description',
        ],
        url: { 'default': '/admin/publisher' },
        default: {
            name: '', description: ''
        }
    },
    update: {
        column: [
            'name', 'description',
        ],
        url: { 'default': '/admin/publisher' },
        default: {
            name: '', description: ''
        }
    }
});
