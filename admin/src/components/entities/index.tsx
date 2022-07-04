import { Route, Routes } from 'react-router-dom';

import { FileIndex } from './file';

import { UserIndex } from './user';
import { UserClassIndex } from './userClass';
import { PhoneIndex } from './authPhone';
import { EmailIndex } from './authEmail';

import { ProductIndex } from './product';
import { PaymentIndex } from './payment';
import { PaymentStatusIndex } from './paymentStatus';

import { AnswerIndex } from './answer';
import { QuestionIndex } from './question';

export function EntityMain() {
    return (
        <main>
            <div className="container-fluid px-4 pt-4">
                <Routes>
                    <Route path="/authEmail/*" element={<EmailIndex />} />
                    <Route path="/authPhone/*" element={<PhoneIndex />} />
                    <Route path="/userClass/*" element={<UserClassIndex />} />
                    <Route path="/user/*" element={<UserIndex />} />

                    <Route path="/product/*" element={<ProductIndex />} />
                    <Route path="/payment/*" element={<PaymentIndex />} />
                    <Route
                        path="/paymentStatus/*"
                        element={<PaymentStatusIndex />}
                    />

                    <Route path="/answer/*" element={<AnswerIndex />} />
                    <Route path="/question/*" element={<QuestionIndex />} />

                    <Route path="/file/*" element={<FileIndex />} />
                </Routes>
            </div>
        </main>
    );
}
