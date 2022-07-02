import { Route, Routes } from 'react-router-dom';

import { UserIndex } from './user';
import { FileIndex } from './file';
import { UserClassIndex } from './user_class';

export function EntityMain() {
    return (
        <main>
            <div className="container-fluid px-4 pt-4">
                <Routes>
                    <Route path="/userClass/*" element={<UserClassIndex />} />
                    <Route path="/user/*" element={<UserIndex />} />
                    <Route path="/file/*" element={<FileIndex />} />
                </Routes>
            </div>
        </main>
    );
}
