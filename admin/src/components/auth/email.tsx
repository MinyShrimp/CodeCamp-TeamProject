import axios from 'axios';
import { useEffect, useState } from 'react';

export function EmailIndex() {
    const [resultMsg, setResultMsg] = useState<string>('');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        if (token === null) {
            return;
        }

        axios
            .get(`${process.env.BE_URL}/auth/email?token=${token}`)
            .then((res) => {
                setResultMsg(res.data);
            });

        return () => {};
    }, []);

    return <>{resultMsg}</>;
}
