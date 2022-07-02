import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getType } from '../../functions/functions';
import { sendGraphQL } from '../logics/sendGraphQL';

/**
 * Restore Token
 * @returns
 */
export function OAuthRestore() {
    const navi = useNavigate();

    useEffect(() => {
        (async () => {
            navi('/auth/token', { state: '/auth/login' });
        })();

        return () => {};
    }, []);

    return <></>;
}
