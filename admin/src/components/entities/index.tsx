import { Route, Routes } from 'react-router-dom';

import { UserIndex } from './user';
import { FileIndex } from './file';

export function EntityMain() {
    return (
        <main>
            <div className="container-fluid px-4 pt-4">
                <Routes>
                    <Route path="/user/*" element={<UserIndex />} />
                    <Route path="/file/*" element={<FileIndex />} />
                </Routes>
            </div>
        </main>
    );
}
