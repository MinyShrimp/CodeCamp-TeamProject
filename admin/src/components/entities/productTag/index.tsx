import React from 'react';
import { EntityFactory } from '../entity_factory';
import { DummyProductTagColumn, IProductTagColumn } from './interface';

// prettier-ignore
export const ProductTagIndex = EntityFactory.getEntity<IProductTagColumn>({
    name: 'Product Tag',
    dummyData: DummyProductTagColumn,
    list: {
        column: [
            'id', 'name', 'createAt'
        ],
        url: '/admin/product-tags'
    },
    show: {
        column: [
            'id', 'name', 'createAt'
        ],
        url: '/admin/product-tag'
    },
});
