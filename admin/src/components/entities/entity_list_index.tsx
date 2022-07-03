import axios, { AxiosResponse } from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntityTable } from './entity_table';
import { IColumn } from './interface';
import { IEntityConfig } from './types';

export function EntityListIndex(props: {
    beURL: string;
    baseURL: string;
    columns: Array<IEntityConfig>;
    setEditHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    setReloadHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    setDeleteHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    deleteRows: Array<string>;
    setDeleteRows: Dispatch<SetStateAction<string[]>>;
}) {
    const [datas, setDatas] = useState<IColumn[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    const navi = useNavigate();

    const _reload = async () => {
        setPending(true);

        setDatas([]);
        props.setDeleteRows([]);
        axios
            .get(`${process.env.BE_URL}${props.beURL}/all`)
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
            .delete(`${process.env.BE_URL}${props.beURL}/bulk`, {
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
        props.setEditHandler(() => async () => {
            navi(`${props.baseURL}/edit`);
        });
        props.setReloadHandler(() => _reload);
        props.setDeleteRows([]);

        (async () => {
            await _reload();
        })();

        return () => {};
    }, []);

    useEffect(() => {
        props.setDeleteHandler(() => _delete);
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
