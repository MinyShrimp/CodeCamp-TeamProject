import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getType } from '../../functions/functions';
import { sendGraphQL } from '../logics/sendGraphQL';

/**
 * Restore Token
 * @returns
 */
export function TokenIndex() {
    const { state } = useLocation();
    const navi = useNavigate();

    useEffect(() => {
        (async () => {
            if (getType(state) !== 'String') {
                alert('잘못된 접근입니다.');
                return;
            }

            const { data } = await sendGraphQL({
                query: `mutation { restoreToken }`,
            });

            if (data) {
                if (data.restoreToken) {
                    localStorage.setItem('access_token', data.restoreToken);
                    navi(state as string);
                    return;
                }
            }
            navi('/admin/logic/login');
        })();

        return () => {};
    }, []);

    return <></>;
}
