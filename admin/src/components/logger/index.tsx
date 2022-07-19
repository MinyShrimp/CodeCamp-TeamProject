import { Route, Routes } from 'react-router-dom';
import { ResponseLoggerIndex } from './response';

export function LoggerIndex() {
    return (
        <Routes>
            <Route path="/response" element={<ResponseLoggerIndex />} />
        </Routes>
    );
}
