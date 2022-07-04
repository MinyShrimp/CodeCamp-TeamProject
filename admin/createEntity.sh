#!/bin/bash

FILENAME=$1

APIDIR=./src/components/entities/$FILENAME
UPPER="$(tr '[:lower:]' '[:upper:]' <<< ${FILENAME:0:1})${FILENAME:1}"

mkdir $APIDIR

##############################################################################
# interface
INTERFACE_FILE=$APIDIR/interface.tsx
echo "import { getDefaultDate } from '../../../functions/functions';

const now = getDefaultDate();

// prettier-ignore
export const Dummy${UPPER}Column = {
    id: '', 
};
export type I${UPPER}Column = typeof Dummy${UPPER}Column;
" >> $INTERFACE_FILE

##############################################################################
# index
INDEX_FILE=$APIDIR/index.tsx
echo "import { EntityFactory } from '../entity_factory';
import { I${UPPER}Column, Dummy${UPPER}Column } from './interface';

// prettier-ignore
export const ${UPPER}Index = EntityFactory.getEntity<I${UPPER}Column>({
    name: '',
    dummyData: Dummy${UPPER}Column,
    beURL: '/admin/${FILENAME}',
    baseURL: '/admin/entity/${FILENAME}',
    list: {
        column: [
            'id', 
        ],
    },
    show: {
        column: [
            'id', 
        ],
    },
    edit: {
        column: [
            'id', 
        ],
        default: {
            id: '', 
        }
    },
    update: {
        column: [
            'id', 
        ],
        default: {
            id: '', 
        }
    }
});
" >> $INDEX_FILE