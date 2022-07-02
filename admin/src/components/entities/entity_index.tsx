import React, { Dispatch, SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';
import { EntityEditIndex } from './entity_edit_index';

import { EntityListIndex } from './entity_list_index';
import { EntityShowIndex } from './entity_show_index';
import { IEntityConfig } from './types';

export function EntityIndex(props: {
    deleteRows: Array<string>;
    setReload: Dispatch<SetStateAction<() => Promise<void>>>;
    setDeleted: Dispatch<SetStateAction<() => Promise<void>>>;
    setDeleteRows: Dispatch<SetStateAction<string[]>>;

    list?: { column: IEntityConfig[]; url: string };
    show?: { column: IEntityConfig[]; url: string };
    edit?: { column: IEntityConfig[]; url: { [key in string]: string } };
    EditInput?: any;
}) {
    return (
        <Routes>
            {props.list ? (
                <Route
                    path="/"
                    element={
                        <EntityListIndex
                            url={props.list.url}
                            columns={props.list.column}
                            setReload={props.setReload}
                            setDeleted={props.setDeleted}
                            deleteRows={props.deleteRows}
                            setDeleteRows={props.setDeleteRows}
                        />
                    }
                />
            ) : null}

            {props.edit ? (
                <Route
                    path="/edit"
                    element={
                        <EntityEditIndex
                            url={props.edit.url}
                            columns={props.edit.column}
                            inputs={props.EditInput}
                            setReload={props.setReload}
                            setDeleted={props.setDeleted}
                            deleteRows={props.deleteRows}
                            setDeleteRows={props.setDeleteRows}
                        />
                    }
                />
            ) : null}

            {props.show ? (
                <Route
                    path="*"
                    element={
                        <EntityShowIndex
                            url={props.show.url}
                            columns={props.show.column}
                            setReload={props.setReload}
                            setDeleted={props.setDeleted}
                            deleteRows={props.deleteRows}
                            setDeleteRows={props.setDeleteRows}
                        />
                    }
                />
            ) : null}
        </Routes>
    );
}
