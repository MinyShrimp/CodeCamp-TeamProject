import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

export interface IGQLResponse {
    data: { [key in string]: any } | null;
    error: object | null;
    message: string | null;
}

export function getGraphQLResponse(
    res: AxiosResponse, //
): IGQLResponse {
    const [data, errors] = [res.data.data, res.data.errors];
    let [error, message] = [null, null];
    if (errors) {
        [error, message] = [errors[0], errors[0].message];
    }
    return { data, error, message };
}

export async function sendGraphQL(props: {
    query: string;
    header?: AxiosRequestHeaders; //
}) {
    const _axios = axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            ...props.header,
        },
    });
    const res = await _axios.post(`${process.env.BE_URL}/graphql`, {
        query: props.query,
    });
    return getGraphQLResponse(res);
}

export async function sendGraphQLWithAuth(props: {
    query: string; //
}): Promise<{
    status: boolean;
    data: any;
}> {
    const _axios = axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${
                localStorage.getItem('access_token') ?? ''
            }`,
        },
    });
    const res = await _axios.post(`${process.env.BE_URL}/graphql`, {
        query: props.query,
    });
    const response = getGraphQLResponse(res);

    if (response.error !== null) {
        return { status: false, data: undefined };
    } else {
        return { status: true, data: response.data };
    }
}
