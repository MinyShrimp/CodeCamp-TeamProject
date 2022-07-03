import { v4 } from 'uuid';
import axios, { AxiosResponse } from 'axios';
import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getLastPath } from '../../functions/functions';
import { IEntityConfig } from './types';

export function EntityShowIndex(props: {
    beURL: string;
    baseURL: string;
    columns: Array<IEntityConfig>;
    updateInput: MutableRefObject<any>;
    setEditHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    setReloadHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    setDeleteHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    deleteRows: Array<string>;
    setDeleteRows: Dispatch<SetStateAction<string[]>>;
}) {
    const pathName = window.location.pathname;
    const entityID = getLastPath(pathName);

    const [data, setData] = useState<any>(undefined);
    const [pending, setPending] = useState<boolean>(true);

    const navi = useNavigate();

    const _reload = useCallback(async () => {
        setPending(true);

        setData(undefined);
        axios
            .get(`${process.env.BE_URL}${props.beURL}/${entityID}`)
            .then((res: AxiosResponse) => {
                if (res.data === '') {
                    navi(props.baseURL);
                }
                setData(res.data);
                setPending(false);
            })
            .catch((error: any) => {
                console.log(error);
                setPending(false);
            });
    }, []);

    const _delete = useCallback(async () => {
        axios
            .delete(`${process.env.BE_URL}${props.beURL}/bulk`, {
                data: props.deleteRows,
            })
            .then((res: AxiosResponse) => {
                navi(`/admin/entity/${props.beURL.split('/').slice(-1)[0]}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const _edit = async () => {
        Object.keys(props.updateInput.current).forEach((k) => {
            props.updateInput.current[k] = data[k];
        });

        navi(`${props.baseURL}/edit/${entityID}`);
    };

    useEffect(() => {
        (async () => {
            await _reload();
        })();

        props.setReloadHandler(() => _reload);
        props.setDeleteRows([entityID]);

        return () => {};
    }, []);

    useEffect(() => {
        props.setEditHandler(() => _edit);
    }, [data]);

    useEffect(() => {
        props.setDeleteHandler(() => _delete);
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
