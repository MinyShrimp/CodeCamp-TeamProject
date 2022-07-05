import { ReactNode } from 'react';
import { TableColumn } from 'react-data-table-component';
import { Primitive } from 'react-data-table-component/dist/src/DataTable/types';

export interface IEntityConfig {
    name: string;
    data: any;
    type: string;
    sortable?: boolean;
    selector: (
        row: any,
        rowIndex?: number,
        column?: TableColumn<any>,
        id?: string | number,
    ) => Primitive;
    cell?: (
        row: any,
        rowIndex?: number,
        column?: TableColumn<any>,
        id?: string | number,
    ) => ReactNode;
    edit_cell: (props: { row: any; data: any }) => JSX.Element;

    width?: string;
    minWidth?: string;
    maxWidth?: string;
}
