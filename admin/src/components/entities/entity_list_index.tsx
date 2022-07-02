import axios, { AxiosResponse } from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EntityTable } from './entity_table';
import { IColumn } from './interface';
import { IEntityConfig } from './types';

export function EntityListIndex(props: {
    url: string;
    columns: Array<IEntityConfig>;
    setReload: Dispatch<SetStateAction<() => Promise<void>>>;
    setDeleted: Dispatch<SetStateAction<() => Promise<void>>>;
    deleteRows: Array<string>;
    setDeleteRows: Dispatch<SetStateAction<string[]>>;
}) {
    const [datas, setDatas] = useState<IColumn[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    const _reload = async () => {
        setPending(true);

        setDatas([]);
        props.setDeleteRows([]);
        axios
            .get(`${process.env.BE_URL}${props.url}`)
            .then((res: AxiosResponse) => {
                setDatas(res.data);
                setPending(false);
            })
            .catch((error) => {
                console.log(error);
                setPending(false);
            });
    };

    const _delete = async () => {
        setPending(true);

        axios
            .delete(`${process.env.BE_URL}${props.url}`, {
                data: props.deleteRows,
            })
            .then((res: AxiosResponse) => {
                console.log(res);
                _reload();
            })
            .catch((error) => {
                console.log(error);
                setPending(false);
            });
    };

    useEffect(() => {
        props.setReload(() => _reload);
        props.setDeleteRows([]);

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
        <EntityTable
            columns={props.columns}
            datas={datas}
            pending={pending}
            setDeleteRows={props.setDeleteRows}
        />
    );
}
