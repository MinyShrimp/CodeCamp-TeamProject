import { Route, Routes } from 'react-router-dom';

/****************************************************************************/
/* 파일 */
import { FileIndex } from './file';

/****************************************************************************/
/* 회원 */
import { UserIndex } from './user';
import { UserClassIndex } from './userClass';
import { PhoneIndex } from './authPhone';
import { EmailIndex } from './authEmail';

/****************************************************************************/
/* 결제 */
import { ProductIndex } from './product';
import { PaymentIndex } from './payment';
import { PaymentStatusIndex } from './paymentStatus';

/****************************************************************************/
/* 문의 */
import { AnswerIndex } from './answer';
import { QuestionIndex } from './question';

/****************************************************************************/
/* 게시판 */
import { EventIndex } from './event';
import { NoticeIndex } from './notice';

/****************************************************************************/
/* 소설 */
import { NovelIndex } from './novel';
import { NovelIndexIndex } from './novelIndex';
import { NovelReviewIndex } from './novelReview';
import { NovelIndexReviewIndex } from './novelIndexReview';
import { NovelTagIndex } from './novelTag';

/****************************************************************************/
/* 포인트 결제 */

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
                    <Route path="/novelDonate/*" element={<></>} />
                    <Route path="/novelLike/*" element={<></>} />
                    <Route path="/bookmark/*" element={<></>} />

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

                    {/****************************************************************************/}
                    {/* 게시판 */}
                    <Route path="/notice/*" element={<NoticeIndex />} />
                    <Route path="/event/*" element={<EventIndex />} />
                    <Route path="/board/*" element={<></>} />
                    <Route path="/comment/*" element={<></>} />

                    {/****************************************************************************/}
                    {/* 소설 */}
                    <Route path="/novel/*" element={<NovelIndex />} />
                    <Route
                        path="/novelReview/*"
                        element={<NovelReviewIndex />}
                    />
                    <Route path="/novelIndex/*" element={<NovelIndexIndex />} />
                    <Route
                        path="/novelIndexReview/*"
                        element={<NovelIndexReviewIndex />}
                    />
                    <Route path="/novelTag/*" element={<NovelTagIndex />} />

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
