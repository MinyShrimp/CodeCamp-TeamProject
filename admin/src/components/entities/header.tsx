import { IconButton } from '@material-ui/core';
import { Add, Delete, FilterList, Replay } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export function EntityIndexHeader(props: {
    entityName: string;
    baseURL: string;

    editHandler: () => Promise<void>;
    reloadHandler: () => Promise<void>;
    deleteHandler: () => Promise<void>;
    deleteRows: Array<string>;

    isList: boolean;
    isShow: boolean;
    isEdit: boolean;
    isUpdate: boolean;
}) {
    const isShowPage = location.pathname.includes('show');
    const isAddDisabled =
        (isShowPage && !props.isUpdate) || (!isShowPage && !props.isEdit);

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
                        to={`${props.baseURL}`}
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
                                isAddDisabled ? '--bs-gray' : '--bs-success'
                            })`,
                        }}
                        onClick={async () => {
                            await props.editHandler();
                        }}
                        disabled={isAddDisabled}
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
                            await props.deleteHandler();
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
                            await props.reloadHandler();
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
