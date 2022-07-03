import React from 'react';
import { EntityFactory } from '../entity_factory';
import { DummyFile, DummyFileColumn, IFileColumn } from './interface';

// prettier-ignore
export const FileIndex = EntityFactory.getEntity<IFileColumn>({
    name: 'File',
    dummyData: DummyFileColumn,
    baseURL: '/admin/entity/file',
    beURL: '/admin/file',
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
