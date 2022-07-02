import { v4 } from 'uuid';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Switch, TextareaAutosize, TextField } from '@material-ui/core';
import { CancelOutlined, CheckCircleOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import DataListInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';

import { getType } from '../../functions/functions';
import { getDate, getDateFormatting } from '../../functions/times';

import { IEntityConfig } from './types';
import { EntityIndex } from './entity_index';
import { EntityIndexHeader } from './header';

export class EntityFactory {
    private static createColumn<T>(
        dummy: T,
        config: {
            url: string | { [key in string]: string };
            column: Array<keyof T>;
            option?: Partial<{ [key in keyof T]: string }>;
        },
    ) {
        return config.column.map((key, idx) => {
            const tmp: IEntityConfig = {
                name: key as string,
                data: dummy[key],
                type: getType(dummy[key]),
                sortable: true,
                selector: (row: any) => row[key],
                cell: undefined,
                edit_cell: (props: { row: any; data: any }) => {
                    return (
                        <TextField
                            key={v4()}
                            id={key as string}
                            style={{ width: '100%' }}
                            type={getType(dummy[key])}
                            defaultValue={props.data}
                            onInput={(event) => {
                                // @ts-ignore
                                props.row[key] = event.target.value;
                            }}
                        />
                    );
                },
                minWidth: `calc((100% - 50px) / ${config.column.length})`,
            };

            if (tmp.name === 'pwd') {
                tmp.type = 'password';
                tmp.edit_cell = (props: { row: any; data: any }) => {
                    return (
                        <TextField
                            key={v4()}
                            id={tmp.name as string}
                            style={{ width: '100%' }}
                            type="password"
                            defaultValue={props.data}
                            onInput={(event) => {
                                // @ts-ignore
                                props.row['pwd'] = event.target.value;
                            }}
                        />
                    );
                };
            } else if (tmp.name === 'description') {
                tmp.edit_cell = (props: { row: any; data: any }) => {
                    return (
                        <TextareaAutosize
                            key={v4()}
                            id={tmp.name as string}
                            style={{
                                width: '100%',
                                height: '300px',
                                background: 'rgba(0,0,0,0)',
                            }}
                            defaultValue={props.data}
                            onInput={(event) => {
                                // @ts-ignore
                                props.row['description'] = event.target.value;
                            }}
                        />
                    );
                };
            } else if (tmp.name.includes('ID')) {
                tmp.edit_cell = (props: { row: any; data: any }) => {
                    const [items, setItems] = useState([]);

                    useEffect(() => {
                        axios
                            .get(
                                `${process.env.BE_URL}${
                                    (config.url as { [K in string]: string })[
                                        key as string
                                    ]
                                }`,
                            )
                            .then((res) => {
                                setItems(
                                    res.data.map((v: any) => {
                                        return {
                                            id: v.id,
                                            value: v.name ?? v.title,
                                        };
                                    }),
                                );
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }, []);

                    return (
                        <DataListInput
                            key={v4()}
                            className="mt-2"
                            label=""
                            items={items}
                            onSelect={(item) => {
                                props.row[tmp.name] = item.id;
                            }}
                        />
                    );
                };
            } else if (tmp.name.includes('file')) {
                tmp.edit_cell = (props: { row: any; data: any }) => {
                    return (
                        <>
                            <div>
                                <input
                                    key={v4()}
                                    className="mt-2"
                                    type="file"
                                    multiple
                                    required
                                    accept="image/*"
                                    onChange={(event) => {
                                        const files = event.target.files;
                                        props.row[tmp.name] = files ?? [];
                                        console.log(props.row[tmp.name]);
                                    }}
                                />
                            </div>
                        </>
                    );
                };
            } else if (tmp.name === 'url') {
                tmp.cell = (row: any) => {
                    return (
                        <>
                            <a
                                href={`https://storage.googleapis.com${row[key]}`}
                                target="_blank"
                            >
                                {row[key]}
                            </a>
                        </>
                    );
                };
            }

            if (tmp.type === 'Date') {
                tmp.selector = (row: any) => {
                    return row[key] !== null
                        ? getDateFormatting(getDate(row[key]))
                        : '';
                };
            } else if (tmp.type === 'Boolean') {
                tmp.cell = (row: any) => {
                    return row[key] ? (
                        <CheckCircleOutlined htmlColor="green" />
                    ) : (
                        <CancelOutlined htmlColor="red" />
                    );
                };
                tmp.edit_cell = (props: { row: any; data: any }) => {
                    return (
                        <Switch
                            key={v4()}
                            id={tmp.name as string}
                            defaultChecked={props.data}
                            onChange={(event) => {
                                props.row[tmp.name] = event.target.checked;
                            }}
                        />
                    );
                };
            } else if (tmp.type === 'Object') {
                tmp.cell = (row: any) => {
                    return (
                        <>
                            {row[key] !== null && row[key] !== undefined ? (
                                config.option === undefined ? (
                                    <Link
                                        to={`/admin/entity/${key as string}/${
                                            row[key]['id']
                                        }`}
                                    >
                                        {row[key]['id']}
                                    </Link>
                                ) : (
                                    <Link
                                        to={`/admin/entity/${
                                            key === 'productCategory' ||
                                            key === 'parent'
                                                ? 'product/category'
                                                : (key as string)
                                        }/${row[key]['id']}`}
                                        reloadDocument
                                    >
                                        {row[key][config.option[key]]}
                                    </Link>
                                )
                            ) : (
                                ''
                            )}
                        </>
                    );
                };
            } else if (tmp.type === 'Array') {
                tmp.cell = (row: any) => {
                    return (
                        <>
                            {row[key].map((v: any, idx: number) => {
                                return (
                                    <li key={v4()}>
                                        <Link
                                            to={`/admin/entity/${
                                                {
                                                    book_images: 'book/image',
                                                    productTags: 'product/tag',
                                                    products: 'product',
                                                }[key as string]
                                            }/${v.id}`}
                                            key={v4()}
                                        >
                                            {v.name ?? v.id}
                                        </Link>
                                    </li>
                                );
                            })}
                        </>
                    );
                };
            }

            return tmp;
        });
    }

    static getEntity<T>(columnConfig: {
        name: string;
        dummyData: T;
        list?: {
            url: string;
            column: Array<keyof T>;
            option?: Partial<{ [key in keyof T]: string }>;
        };
        show?: {
            url: string;
            column: Array<keyof T>;
            option?: Partial<{ [key in keyof T]: string }>;
        };
        edit?: {
            url: { [key in string]: string };
            default: Partial<T>;
            column: Array<keyof T>;
        };
        update?: {
            url: { [key in string]: string };
            default: Partial<T>;
            column: Array<keyof T>;
        };
    }) {
        const config = {
            list:
                columnConfig.list !== undefined
                    ? {
                          column: this.createColumn<T>(
                              columnConfig.dummyData,
                              columnConfig.list,
                          ),
                          url: columnConfig.list.url,
                      }
                    : undefined,
            show:
                columnConfig.show !== undefined
                    ? {
                          column: this.createColumn<T>(
                              columnConfig.dummyData,
                              columnConfig.show,
                          ),
                          url: columnConfig.show.url,
                      }
                    : undefined,
            edit:
                columnConfig.edit !== undefined
                    ? {
                          column: this.createColumn<T>(
                              columnConfig.dummyData,
                              columnConfig.edit,
                          ),
                          url: columnConfig.edit.url,
                      }
                    : undefined,
            update:
                columnConfig.update !== undefined
                    ? {
                          column: this.createColumn<T>(
                              columnConfig.dummyData,
                              columnConfig.update,
                          ),
                          url: columnConfig.update.url,
                      }
                    : undefined,
        };

        return () => {
            const [entityName, setEntityName] = useState<string>('');
            const [reload, setReload] = useState(() => async () => {});
            const [deleted, setDeleted] = useState(() => async () => {});
            const [deleteRows, setDeleteRows] = useState<Array<string>>([]);

            const editInput =
                columnConfig.edit !== undefined
                    ? useRef(columnConfig.edit.default)
                    : undefined;

            useEffect(() => {
                setEntityName(columnConfig.name);
                return () => {};
            }, []);

            return (
                <>
                    <EntityIndexHeader
                        entityName={entityName}
                        reload={reload}
                        deleted={deleted}
                        deleteRows={deleteRows}
                        isList={config.list !== undefined}
                        isShow={config.show !== undefined}
                        isEdit={config.edit !== undefined}
                    />
                    <EntityIndex
                        setReload={setReload}
                        setDeleted={setDeleted}
                        deleteRows={deleteRows}
                        setDeleteRows={setDeleteRows}
                        list={config.list}
                        show={config.show}
                        edit={config.edit}
                        EditInput={editInput}
                    />
                </>
            );
        };
    }
}
