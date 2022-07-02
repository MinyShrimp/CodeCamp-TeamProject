import React, { Dispatch, SetStateAction } from 'react';
import { IconButton } from '@material-ui/core';
import { Add, Delete, FilterList, Replay } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

export function EntityIndexHeader(props: {
    entityName: string;
    reload: () => Promise<void>;
    deleted: () => Promise<void>;
    deleteRows: Array<string>;
    isList: boolean;
    isShow: boolean;
    isEdit: boolean;
}) {
    const navi = useNavigate();

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >
                <div>
                    <p className="mb-0" style={{ color: 'var(--bs-blue)' }}>
                        Entity
                    </p>
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: 'var(--bs-gray-dark)',
                        }}
                        className="mb-0 h1"
                        id="entity_name"
                        to={`/admin/entity/${props.entityName
                            .split(' ')
                            .join('/')
                            .toLowerCase()}`}
                    >
                        {props.entityName}
                    </Link>
                </div>
                <div>
                    <IconButton
                        className="mb-0"
                        size="small"
                        style={{
                            color: `var(${
                                props.isEdit ? '--bs-success' : '--bs-gray'
                            })`,
                        }}
                        onClick={() => {
                            navi(
                                `/admin/entity/${props.entityName
                                    .split(' ')
                                    .join('/')
                                    .toLowerCase()}/edit`,
                            );
                        }}
                        disabled={!props.isEdit}
                    >
                        <Add />
                    </IconButton>
                    <IconButton
                        className="mb-0"
                        size="small"
                        style={{
                            color: `var(--bs-yellow)`,
                        }}
                        onClick={async () => {}}
                    >
                        <FilterList />
                    </IconButton>
                    <IconButton
                        className="mb-0"
                        size="small"
                        style={{
                            color: `var(${
                                props.deleteRows.length === 0
                                    ? '--bs-gray'
                                    : '--bs-red'
                            })`,
                        }}
                        onClick={async () => {
                            await props.deleted();
                        }}
                        disabled={props.deleteRows.length === 0}
                    >
                        <Delete />
                    </IconButton>
                    <IconButton
                        className="mb-0"
                        size="small"
                        color="primary"
                        onClick={async () => {
                            await props.reload();
                        }}
                    >
                        <Replay />
                    </IconButton>
                </div>
            </div>
            <hr></hr>
        </>
    );
}
