#!/bin/bash

FILENAME=$1

APIDIR=./src/components/entities/$FILENAME
UPPER="$(tr '[:lower:]' '[:upper:]' <<< ${FILENAME:0:1})${FILENAME:1}"

mkdir $APIDIR

##############################################################################
# interface
INTERFACE_FILE=$APIDIR/interface.tsx
echo "
const now = new Date();
// prettier-ignore
export const Dummy${UPPER}Column = {
    id: '',
};
export type I${UPPER}Column = typeof Dummy${UPPER}Column;
" >> $INTERFACE_FILE

##############################################################################
# columns
COLUMNS_FILE=$APIDIR/columns.tsx
echo "
import { createColumns } from '../../../functions/createColumns';
import { Dummy${UPPER}Column } from './interface';

// prettier-ignore
export const ${UPPER}ColumnConfig = {
    listColumns: [
        'id', 
    ],
    showColumns: [
        'id',
    ],
};

export const List${UPPER}Columns = createColumns(
    Dummy${UPPER}Column,
    ${UPPER}ColumnConfig.listColumns,
);

export const Show${UPPER}Columns = createColumns(
    Dummy${UPPER}Column,
    ${UPPER}ColumnConfig.showColumns,
);
" >> $COLUMNS_FILE

##############################################################################
# index
INDEX_FILE=$APIDIR/index.tsx
echo "
import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { List${UPPER}Columns, Show${UPPER}Columns } from './columns';

export function ${UPPER}Index(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('${UPPER}');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl=\"/admin/${FILENAME}s\"
            ListColumns={List${UPPER}Columns}
            ShowUrl=\"/admin/${FILENAME}\"
            ShowColumns={Show${UPPER}Columns}
        />
    );
}
" >> $INDEX_FILE