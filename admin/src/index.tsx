import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Page404 } from './components/pages/404';
import { AuthIndex } from './components/auth';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/auth/*" element={<AuthIndex />} />
            <Route path="/admin/*" element={<App />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    </BrowserRouter>,
);
