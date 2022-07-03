import { Route, Routes } from 'react-router-dom';

import { UserIndex } from './user';
import { FileIndex } from './file';
import { UserClassIndex } from './user_class';
import { PhoneIndex } from './auth_phone';
import { EmailIndex } from './auth_email';
import { PaymentStatusIndex } from './payment_status';
import { ProductIndex } from './product';
import { PaymentIndex } from './payment';

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

                    <Route path="/file/*" element={<FileIndex />} />
                </Routes>
            </div>
        </main>
    );
}
