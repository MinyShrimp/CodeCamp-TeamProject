import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { Index } from './components/index';
import { LoginPage } from './components/login';
import { AuthIndex } from './components/auth';

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const admin = {
            id: process.env.ADMIN_ID as string,
            pwd: process.env.ADMIN_PWD as string,
        };

        const _pwd = window.localStorage.getItem('admin');
        if (_pwd) {
            if (compareSync(admin.pwd, _pwd)) {
                window.localStorage.setItem(
                    'admin',
                    hashSync(admin.pwd, genSaltSync()),
                );
                const pathname =
                    window.location.pathname === '/admin/login' ||
                    window.location.pathname === '/'
                        ? '/admin'
                        : window.location.pathname;
                navigate(pathname, { replace: true });
                return () => {};
            }
        }
        navigate('/admin/login', { replace: true });
    }, [navigate]);

    return (
        <div className="App" style={{ height: '100vh' }}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/*" element={<AuthIndex />} />
                <Route path="/*" element={<Index />} />
            </Routes>
        </div>
    );
}

export default App;
