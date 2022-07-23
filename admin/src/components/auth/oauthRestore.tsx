import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Restore Token
 * @returns
 */
export function OAuthRestore() {
    const navi = useNavigate();

    useEffect(() => {
        (async () => {
            navi('/admin/auth/token', { state: '/auth/login' });
        })();

        return () => {};
    }, []);

    return <></>;
}
