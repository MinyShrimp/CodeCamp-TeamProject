import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { IEntityConfig } from './types';
import { useNavigate } from 'react-router-dom';

export function EntityEditIndex(props: {
    setReload: Function;
    setDeleted: Dispatch<SetStateAction<() => Promise<void>>>;
    deleteRows: Array<string>;
    setDeleteRows: Dispatch<SetStateAction<string[]>>;

    url: { [key in string]: string };
    columns: Array<IEntityConfig>;
    inputs: any;
}) {
    const [pending, setPending] = useState<boolean>(false);
    const navi = useNavigate();

    const submit = async () => {
        setPending(true);

        const { files, ...inputs } = props.inputs.current;

        try {
            if (files) {
                await submitFile(files);
            }
            if (Object.keys(inputs).length !== 0) {
                await submitInput(inputs);
            }
        } catch (e) {
            console.log(e);
        }

        setPending(false);
        navi(`/admin/entity/${props.url['default'].split('/').slice(-1)}`);
    };

    const submitInput = async (inputs: any) => {
        const res = await axios.post(
            `${process.env.BE_URL}${props.url['default']}`,
            inputs,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log(res);

        return res;
    };

    const submitFile = async (files: FileList) => {
        const file_values = Object.values(files);

        const variables = `[${file_values
            .map((_) => {
                return 'null';
            })
            .join(',')}]`;

        const maps = `{ ${file_values
            .map((_, idx) => {
                return `"${idx}": ["variables.files.${idx}"]`;
            })
            .join(',')} }`;

        const frm = new FormData();
        frm.append(
            'operations',
            `{ "query": "mutation uploadFile($files: [Upload!]!) {uploadFile(files: $files) { id }}", "variables": { "files": ${variables} } }`,
        );
        frm.append('map', maps);
        Object.values(files).forEach((file, idx) => {
            frm.append(`${idx}`, file);
        });

        const res = await axios.post(`${process.env.BE_URL}/graphql`, frm, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(res);
        return res;
    };

    useEffect(() => {
        props.setReload(() => async () => {});
        props.setDeleted(() => async () => {});
        props.setDeleteRows([]);
        return () => {};
    }, [props.setReload]);

    return (
        <div
            style={{
                background: 'var(--bs-gray-100)',
                width: '100%',
                height: 'calc(100vh - 210px)',
                padding: '3rem',
                overflowY: 'scroll',
            }}
        >
            {props.columns.map((column, idx) => {
                return (
                    <div className="mb-4" key={idx}>
                        <label htmlFor={column.name as string} className="mb-1">
                            {' '}
                            {column.name}{' '}
                        </label>
                        <column.edit_cell
                            row={props.inputs.current}
                            data={props.inputs.current[column.name]}
                        />
                    </div>
                );
            })}
            <Button
                className="mt-3"
                type="submit"
                variant="contained"
                color="primary"
                onClick={
                    submit
                    // props.url['default'].includes('file') ? submitFile : submit
                }
            >
                Submit
            </Button>
        </div>
    );
}
