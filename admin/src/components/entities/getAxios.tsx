import axios from 'axios';

export function getAxios() {
    return axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });
}

export function getAxiosWithAuth() {
    return axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${
                localStorage.getItem('access_token') ?? ''
            }`,
        },
    });
}
