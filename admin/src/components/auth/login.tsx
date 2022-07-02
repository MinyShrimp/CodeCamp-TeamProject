import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendGraphQLWithAuth } from '../logics/sendGraphQL';

export function LoginIndex() {
    const navi = useNavigate();

    useEffect(() => {
        (async () => {
            const { status } = await sendGraphQLWithAuth({
                query: `mutation { LoginOAuth }`,
            });

            if (status) {
                navi('/admin/entity/user');
            }
        })();

        return () => {};
    }, []);

    return <></>;
}
