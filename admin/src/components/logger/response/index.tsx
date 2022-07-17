import { IconButton } from '@material-ui/core';
import { KeyboardArrowDown, Replay } from '@material-ui/icons';
import { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
    Primitive,
    TableColumn,
} from 'react-data-table-component/dist/src/DataTable/types';
import { getAxios } from '../../entities/getAxios';
import ReactJson from 'react-json-view';

interface IResponseLogger {
    date: {
        value: string;
    };
    remoteAddr: string;
    remoteUser: string;
    method: string;
    url: string;
    operationName: string;
    httpVersion: number;
    status: number;
    res: number;
    responseTime: number;
    referrer: string;
    userAgent: string;
}

interface IResponseLoggerColumns {
    name: keyof IResponseLogger;
    selector: (
        row: IResponseLogger,
        rowIndex?: number,
        column?: TableColumn<IResponseLogger>,
        id?: string | number,
    ) => Primitive;
}

// prettier-ignore
const columns: Array<IResponseLoggerColumns> = [
    { name: 'date', selector: (row: IResponseLogger) => row.date.value },
    { name: 'remoteAddr', selector: (row: IResponseLogger) => row.remoteAddr },
    { name: 'method', selector: (row: IResponseLogger) => row.method },
    { name: 'url', selector: (row: IResponseLogger) => row.url },
    { name: 'operationName', selector: (row: IResponseLogger) => row.operationName },
    { name: 'httpVersion', selector: (row: IResponseLogger) => row.httpVersion },
    { name: 'status', selector: (row: IResponseLogger) => row.status },
    { name: 'res', selector: (row: IResponseLogger) => row.res },
    { name: 'responseTime', selector: (row: IResponseLogger) => row.responseTime },
    { name: 'referrer', selector: (row: IResponseLogger) => row.referrer },
    { name: 'remoteUser', selector: (row: IResponseLogger) => row.remoteUser },
    { name: 'userAgent', selector: (row: IResponseLogger) => row.userAgent },
];

export function ResponseLoggerIndex() {
    const nowLoadingCount = useRef(0);

    const [page, setPage] = useState(1);
    const [datas, setDatas] = useState<Array<IResponseLogger>>([]);
    const [count, setCount] = useState<number>(0);
    const [pending, setPending] = useState(false);

    const reload = () => {
        setPending(true);

        getAxios()
            .get(`${process.env.BE_URL}/admin/response/1`)
            .then((res) => {
                setDatas(res.data.logs);
                setCount(res.data.count);
                nowLoadingCount.current = 100;
                setPage(1);
                setPending(false);
            })
            .catch((e) => {
                setPending(false);
            });
    };

    const nextPage = (_page: number) => {
        if (_page * 25 >= nowLoadingCount.current) {
            getAxios()
                .get(`${process.env.BE_URL}/admin/response/${page + 1}`)
                .then((res) => {
                    setPage(page + 1);
                    setDatas([...datas, ...res.data.logs]);
                    nowLoadingCount.current += 100;
                    setCount(res.data.count);
                })
                .catch((e) => {});
        }
    };

    useEffect(() => {
        reload();
        return () => {};
    }, []);

    return (
        <div style={{ padding: '1rem' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >
                <div>
                    <p className="mb-0" style={{ color: 'var(--bs-blue)' }}>
                        Logger
                    </p>
                    <div
                        style={{
                            textDecoration: 'none',
                            color: 'var(--bs-gray-dark)',
                        }}
                        className="mb-0 h1"
                    >
                        Response
                    </div>
                </div>
                <div>
                    <IconButton
                        className="mb-0"
                        size="small"
                        color="primary"
                        onClick={reload}
                    >
                        <Replay />
                    </IconButton>
                </div>
            </div>
            <hr></hr>
            <div>
                <DataTable
                    columns={columns}
                    data={datas}
                    pagination
                    responsive
                    fixedHeader
                    fixedHeaderScrollHeight="calc(100vh - 250px)"
                    pointerOnHover
                    highlightOnHover
                    sortIcon={<KeyboardArrowDown />}
                    progressPending={pending}
                    paginationPerPage={25}
                    paginationTotalRows={count}
                    onChangePage={nextPage}
                    customStyles={{
                        headCells: {
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                background: 'var(--bs-gray-800)',
                            },
                        },
                    }}
                    expandableRows
                    expandableRowsComponent={(props) => (
                        <ReactJson src={props.data} />
                    )}
                />
            </div>
        </div>
    );
}
