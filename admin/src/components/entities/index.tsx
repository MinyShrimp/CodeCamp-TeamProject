import { Route, Routes } from 'react-router-dom';

import { UserIndex } from './user';
import { FileIndex } from './file';
import { UserClassIndex } from './user_class';
import { PhoneIndex } from './auth_phone';
import { EmailIndex } from './auth_email';

export function EntityMain() {
    return (
        <main>
            <div className="container-fluid px-4 pt-4">
                <Routes>
                    <Route path="/authEmail/*" element={<EmailIndex />} />
                    <Route path="/authPhone/*" element={<PhoneIndex />} />
                    <Route path="/userClass/*" element={<UserClassIndex />} />
                    <Route path="/user/*" element={<UserIndex />} />
                    <Route path="/file/*" element={<FileIndex />} />
                </Routes>
            </div>
        </main>
    );
}
