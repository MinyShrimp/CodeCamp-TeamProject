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
                    {/****************************************************************************/}
                    {/* 회원 */}
                    <Route path="/authEmail/*" element={<EmailIndex />} />
                    <Route path="/authPhone/*" element={<PhoneIndex />} />
                    <Route path="/userClass/*" element={<UserClassIndex />} />
                    <Route path="/user/*" element={<UserIndex />} />

                    {/****************************************************************************/}
                    {/* 결제 */}
                    <Route path="/product/*" element={<ProductIndex />} />
                    <Route path="/payment/*" element={<PaymentIndex />} />
                    <Route
                        path="/paymentStatus/*"
                        element={<PaymentStatusIndex />}
                    />

                    {/****************************************************************************/}
                    {/* 문의 */}
                    <Route path="/answer/*" element={<AnswerIndex />} />
                    <Route path="/question/*" element={<QuestionIndex />} />
                    <Route path="/novelDonate/*" element={<></>} />
                    <Route path="/novelLike/*" element={<></>} />
                    <Route path="/bookmark/*" element={<></>} />

                    {/****************************************************************************/}
                    {/* 게시판 */}
                    <Route path="/notice/*" element={<></>} />
                    <Route path="/event/*" element={<></>} />
                    <Route path="/board/*" element={<></>} />
                    <Route path="/comment/*" element={<></>} />

                    {/****************************************************************************/}
                    {/* 소설 */}
                    <Route path="/novel/*" element={<></>} />
                    <Route path="/novelReview/*" element={<></>} />
                    <Route path="/novelIndex/*" element={<></>} />
                    <Route path="/novelIndexReview/*" element={<></>} />
                    <Route path="/novelTag/*" element={<></>} />

                    {/****************************************************************************/}
                    {/* 포인트 결제 */}
                    <Route path="/pointPayment/*" element={<></>} />
                    <Route path="/pointPaymentStatus/*" element={<></>} />

                    {/****************************************************************************/}
                    {/* 파일 */}
                    <Route path="/file/*" element={<FileIndex />} />
                </Routes>
            </div>
        </main>
    );
}
