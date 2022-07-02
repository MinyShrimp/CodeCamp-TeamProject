import React from 'react';
import { EntityFactory } from '../entity_factory';
import {
    DummyProductCategoryColumn,
    IProductCategoryColumn,
} from './interface';

// prettier-ignore
export const ProductCategoryIndex =
    EntityFactory.getEntity<IProductCategoryColumn>({
        name: 'Product Category',
        dummyData: DummyProductCategoryColumn,
        list: {
            column: [
                'id', 'name', 'parent', 'createAt'
            ],
            option: {
                parent: 'name'
            },
            url: '/admin/product-categorys'
        },
        show: {
            column: [
                'id', 'name', 'parent', 'createAt'
            ],
            option: {
                parent: 'name'
            },
            url: '/admin/product-category'
        },
        edit: {
            column: [ 'name', 'parentID' ],
            url: { 
                default: '/admin/product-category', 
                'parentID': '/admin/product-category/names' 
            },
            default: {
                name: '', parentID: ''
            }
        },
        update: {
            column: [ 'name', 'parentID' ],
            url: { 
                default: '/admin/product-category',
                'parentID': '/admin/product-category/names' 
            },
            default: {
                name: '', parentID: ''
            }
        }
    });
