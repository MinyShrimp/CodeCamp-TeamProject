import React, { Dispatch, SetStateAction } from 'react';
import DataTable from 'react-data-table-component';
import { KeyboardArrowDown } from '@material-ui/icons';
import { IColumn } from './interface';
import { useNavigate } from 'react-router-dom';
import { IEntityConfig } from './types';

export function EntityTable(props: {
    columns: Array<IEntityConfig>;
    datas: Array<IColumn>;
    pending: boolean;
    setDeleteRows: Dispatch<SetStateAction<string[]>>;
}) {
    const navigate = useNavigate();

    return (
        <DataTable
            columns={props.columns}
            data={props.datas}
            pagination
            responsive
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 250px)"
            pointerOnHover
            highlightOnHover
            onRowClicked={(row) => {
                navigate(`${window.location.pathname}/${row.id}`);
            }}
            sortIcon={<KeyboardArrowDown />}
            progressPending={props.pending}
            paginationPerPage={30}
            customStyles={{
                headCells: {
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        background: 'var(--bs-gray-800)',
                    },
                },
            }}
            selectableRows
            onSelectedRowsChange={({ selectedRows }) => {
                props.setDeleteRows(selectedRows.map((v) => v.id));
            }}
        />
    );
}
