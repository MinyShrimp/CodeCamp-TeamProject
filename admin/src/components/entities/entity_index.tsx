import React, { Dispatch, SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';

import { IEntityConfig } from './types';
import { EntityEditIndex } from './entity_edit_index';
import { EntityListIndex } from './entity_list_index';
import { EntityShowIndex } from './entity_show_index';
import { EntityUpdateIndex } from './entity_update_index';

export function EntityIndex(props: {
    beURL: string;
    baseURL: string;
    deleteRows: Array<string>;
    setEditHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    setReloadHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    setDeleteHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    setDeleteRows: Dispatch<SetStateAction<string[]>>;

    list?: { column: IEntityConfig[] };
    show?: { column: IEntityConfig[] };
    edit?: { column: IEntityConfig[]; url?: { [key in string]: string } };
    update?: { column: IEntityConfig[]; url?: { [key in string]: string } };
    editInput?: any;
    updateInput?: any;
}) {
    return (
        <Routes>
            {props.list ? (
                <Route
                    path="/"
                    element={
                        <EntityListIndex
                            beURL={props.beURL}
                            baseURL={props.baseURL}
                            columns={props.list.column}
                            setEditHandler={props.setEditHandler}
                            setReloadHandler={props.setReloadHandler}
                            setDeleteHandler={props.setDeleteHandler}
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
                            beURL={props.beURL}
                            baseURL={props.baseURL}
                            columns={props.edit.column}
                            input={props.editInput}
                            setEditHandler={props.setEditHandler}
                            setReloadHandler={props.setReloadHandler}
                            setDeleteHandler={props.setDeleteHandler}
                            deleteRows={props.deleteRows}
                            setDeleteRows={props.setDeleteRows}
                        />
                    }
                />
            ) : null}

            {props.update ? (
                <Route
                    path="/edit/*"
                    element={
                        <EntityUpdateIndex
                            beURL={props.beURL}
                            baseURL={props.baseURL}
                            columns={props.update.column}
                            input={props.updateInput}
                            setEditHandler={props.setEditHandler}
                            setReloadHandler={props.setReloadHandler}
                            setDeleteHandler={props.setDeleteHandler}
                            deleteRows={props.deleteRows}
                            setDeleteRows={props.setDeleteRows}
                        />
                    }
                />
            ) : null}

            {props.show ? (
                <Route
                    path="/show/*"
                    element={
                        <EntityShowIndex
                            beURL={props.beURL}
                            baseURL={props.baseURL}
                            columns={props.show.column}
                            updateInput={props.updateInput}
                            setEditHandler={props.setEditHandler}
                            setReloadHandler={props.setReloadHandler}
                            setDeleteHandler={props.setDeleteHandler}
                            deleteRows={props.deleteRows}
                            setDeleteRows={props.setDeleteRows}
                        />
                    }
                />
            ) : null}
        </Routes>
    );
}
