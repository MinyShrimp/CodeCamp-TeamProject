import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { IEntityConfig } from './types';
import { useNavigate } from 'react-router-dom';

export function EntityEditIndex(props: {
    beURL: string;
    baseURL: string;
    setEditHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    setReloadHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    setDeleteHandler: Dispatch<SetStateAction<() => Promise<void>>>;
    deleteRows: Array<string>;
    setDeleteRows: Dispatch<SetStateAction<string[]>>;

    columns: Array<IEntityConfig>;
    input: any;
}) {
    const [pending, setPending] = useState<boolean>(false);
    const navi = useNavigate();

    const submit = async () => {
        setPending(true);

        const { files, ...input } = props.input.current;

        try {
            if (files) {
                await submitFile(files);
            }
            if (Object.keys(input).length !== 0) {
                await submitInput(input);
            }
        } catch (e) {
            console.log(e);
        }

        setPending(false);
        navi(`${props.baseURL}`);
    };

    const submitInput = async (input: any) => {
        const res = await axios.post(
            `${process.env.BE_URL}${props.beURL}`,
            input,
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
            `{ "query": "mutation uploadFile($files: [Upload!]!) {uploadFile(FILE_TYPE: USER, files: $files) { id }}", "variables": { "files": ${variables} } }`,
            // `{ "query": "mutation uploadFileWithThumb($files: [Upload!]!) {uploadFileWithThumb(FILE_TYPE: USER, files: $files) { id }}", "variables": { "files": ${variables} } }`,
        );
        frm.append('map', maps);
        Object.values(files).forEach((file, idx) => {
            frm.append(`${idx}`, file);
        });

        const _axios = axios.create({
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${
                    localStorage.getItem('access_token') ?? ''
                }`,
            },
        });

        const res = await _axios.post(`${process.env.BE_URL}/graphql`, frm);

        console.log(res);
        return res;
    };

    useEffect(() => {
        props.setEditHandler(() => async () => {});
        props.setReloadHandler(() => async () => {});
        props.setDeleteHandler(() => async () => {});
        props.setDeleteRows([]);
        return () => {};
    }, []);

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
                            row={props.input.current}
                            data={props.input.current[column.name]}
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
