import { Route, Routes } from 'react-router-dom';

/****************************************************************************/
/* 파일 */
import { FileIndex } from './file';

/****************************************************************************/
/* 회원 */
import { UserIndex } from './user';
import { PhoneIndex } from './authPhone';
import { EmailIndex } from './authEmail';
import { BookmarkIndex } from './bookmark';
import { UserLikeIndex } from './userLike';
import { UserBlockIndex } from './userBlock';
import { UserClassIndex } from './userClass';
import { NovelLikeIndex } from './novelLike';
import { NovelDonateIndex } from './novelDonate';

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
import { BoardIndex } from './board';
import { CommentIndex } from './comment';

/****************************************************************************/
/* 소설 */
import { NovelIndex } from './novel';
import { NovelTagIndex } from './novelTag';
import { NovelIndexIndex } from './novelIndex';
import { NovelReviewIndex } from './novelReview';
import { NovelCategoryIndex } from './novelCategory';
import { NovelIndexReviewIndex } from './novelIndexReview';

/****************************************************************************/
/* 포인트 결제 */
import { PointPaymentIndex } from './pointPayment';
import { PointPaymentStatusIndex } from './pointPaymentStatus';

/****************************************************************************/
/* 신고 */
import { ReportIndex } from './report';
import { ReportEnumIndex } from './reportEnum';

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
                    <Route
                        path="/novelDonate/*"
                        element={<NovelDonateIndex />}
                    />
                    <Route path="/novelLike/*" element={<NovelLikeIndex />} />
                    <Route path="/bookmark/*" element={<BookmarkIndex />} />
                    <Route path="/userBlock/*" element={<UserBlockIndex />} />
                    <Route path="/userLike/*" element={<UserLikeIndex />} />

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
                    <Route path="/board/*" element={<BoardIndex />} />
                    <Route path="/comment/*" element={<CommentIndex />} />

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
                    <Route
                        path="/novelCategory/*"
                        element={<NovelCategoryIndex />}
                    />

                    {/****************************************************************************/}
                    {/* 포인트 결제 */}
                    <Route
                        path="/pointPayment/*"
                        element={<PointPaymentIndex />}
                    />
                    <Route
                        path="/pointPaymentStatus/*"
                        element={<PointPaymentStatusIndex />}
                    />

                    {/****************************************************************************/}
                    {/* 신고 */}
                    <Route path="/report/*" element={<ReportIndex />} />
                    <Route path="/reportEnum/*" element={<ReportEnumIndex />} />

                    {/****************************************************************************/}
                    {/* 파일 */}
                    <Route path="/file/*" element={<FileIndex />} />
                </Routes>
            </div>
        </main>
    );
}
