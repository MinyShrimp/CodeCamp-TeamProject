import { v4 } from 'uuid';
import axios, { AxiosResponse } from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLastPath } from '../../functions/functions';
import { IEntityConfig } from './types';

export function EntityShowIndex(props: {
    url: string;
    columns: Array<IEntityConfig>;
    setReload: Dispatch<SetStateAction<() => Promise<void>>>;
    setDeleted: Dispatch<SetStateAction<() => Promise<void>>>;
    deleteRows: Array<string>;
    setDeleteRows: Dispatch<SetStateAction<string[]>>;
}) {
    const pathName = window.location.pathname;
    const entityID = getLastPath(pathName);

    const [data, setData] = useState<any>(undefined);
    const [pending, setPending] = useState<boolean>(true);

    const navi = useNavigate();

    const _reload = async () => {
        setPending(true);

        setData(undefined);
        axios
            .get(`${process.env.BE_URL}${props.url}/${entityID}`)
            .then((res: AxiosResponse) => {
                if (res.data === '') {
                    navi(`/admin/entity/${props.url.split('/').slice(-1)[0]}`);
                }
                setData(res.data);
                setPending(false);
            })
            .catch((error: any) => {
                console.log(error);
                setPending(false);
            });
    };

    const _delete = async () => {
        axios
            .delete(`${process.env.BE_URL}${props.url}s`, {
                data: props.deleteRows,
            })
            .then((res: AxiosResponse) => {
                navi(`/admin/entity/${props.url.split('/').slice(-1)[0]}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        props.setReload(() => _reload);
        props.setDeleteRows([entityID]);

        (async () => {
            await _reload();
        })();

        return () => {};
    }, []);

    useEffect(() => {
        props.setDeleted(() => _delete);
        return () => {};
    }, [props.deleteRows]);

    return (
        <div
            style={{
                background: 'var(--bs-gray-300)',
                width: '100%',
                height: 'calc(100vh - 210px)',
                padding: '3rem',
                overflowY: 'scroll',
            }}
        >
            {!pending && data !== undefined ? (
                props.columns.map((column, idx) => {
                    return (
                        <div className="mb-4" key={v4()}>
                            <div>{column.name}</div>
                            <div>
                                {
                                    // prettier-ignore
                                    (column.cell === undefined
                                        ? column.selector === undefined ? '' : column.selector(data)
                                        : column.cell(data, idx, column, idx)
                                    ) as string
                                }
                            </div>
                        </div>
                    );
                })
            ) : (
                <>Loading...</>
            )}
        </div>
    );
}
