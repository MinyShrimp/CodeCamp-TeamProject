import { ReactElement, useState } from 'react';
import { Collapse, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavCollapse(props: {
    id: string;
    title: string;
    items: ReactElement;
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Nav.Link
                onClick={() => setOpen(!open)}
                aria-controls={props.id}
                aria-expanded={open}
                className="sb-sidenav-menu-heading"
            >
                {props.title}
            </Nav.Link>
            <Collapse in={open}>
                <div id={props.id} style={{ marginLeft: '1em' }}>
                    {props.items}
                </div>
            </Collapse>
            <hr></hr>
        </>
    );
}

export function IndexBodySide() {
    return (
        <div id="layoutSidenav_nav">
            <Nav
                className="sb-sidenav accordion sb-sidenav-dark"
                id="sidenavAccordion"
            >
                <div
                    className="sb-sidenav-menu"
                    style={{
                        overflowX: 'hidden',
                        overflowY: 'auto',
                    }}
                >
                    <Nav>
                        <NavCollapse
                            id="core-collapse"
                            title="Core"
                            items={
                                <>
                                    <Nav.Link as={Link} to="/admin">
                                        Dashboard
                                    </Nav.Link>
                                </>
                            }
                        ></NavCollapse>

                        <NavCollapse
                            id="graphql-collapes"
                            title="Logics"
                            items={
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to="/admin/logic/register"
                                    >
                                        Register
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/logic/login">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/admin/logic/logout"
                                    >
                                        Logout
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/admin/logic/forgot/email"
                                    >
                                        Forgot Email
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/admin/logic/forgot/password"
                                    >
                                        Forgot Password
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/admin/logic/product"
                                    >
                                        Product
                                    </Nav.Link>
                                </>
                            }
                        ></NavCollapse>

                        <NavCollapse
                            id="entity-collapes"
                            title="테이블"
                            items={
                                <>
                                    {/****************************************************************************/}
                                    {/* USER */}
                                    <NavCollapse
                                        id="entity-user-collapes"
                                        title="회원"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/user"
                                                >
                                                    회원
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/userClass"
                                                >
                                                    회원 등급
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/authPhone"
                                                >
                                                    핸드폰 인증
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/authEmail"
                                                >
                                                    이메일 인증
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelDonate"
                                                >
                                                    후원작
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelLike"
                                                >
                                                    선호작
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/bookMark"
                                                >
                                                    북마크
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/userBlock"
                                                >
                                                    차단한 회원
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/userLike"
                                                >
                                                    선호하는 작가
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* PRODUCT */}
                                    <NavCollapse
                                        id="entity-product-collapes"
                                        title="상품"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/product"
                                                >
                                                    상품
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/payment"
                                                >
                                                    결제
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/paymentStatus"
                                                >
                                                    결제 상태
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* QUESTION */}
                                    <NavCollapse
                                        id="entity-question-collapes"
                                        title="문의"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/question"
                                                >
                                                    문의
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/answer"
                                                >
                                                    답변
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* BOARD */}
                                    <NavCollapse
                                        id="entity-board-collapes"
                                        title="게시판"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/notice"
                                                >
                                                    공지
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/event"
                                                >
                                                    이벤트
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/board"
                                                >
                                                    자유 게시판
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/comment"
                                                >
                                                    자유 게시판 댓글
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* NOVEL */}
                                    <NavCollapse
                                        id="entity-novel-collapes"
                                        title="소설"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novel"
                                                >
                                                    소설
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelReview"
                                                >
                                                    소설 리뷰
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelIndex"
                                                >
                                                    소설 인덱스
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelIndexReview"
                                                >
                                                    편당 리뷰
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelTag"
                                                >
                                                    소설 태그
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelCategory"
                                                >
                                                    소설 카테고리
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* POINT PAYMENT */}
                                    <NavCollapse
                                        id="entity-point-payment-collapes"
                                        title="포인트 결제"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/pointPayment"
                                                >
                                                    포인트 결제
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/pointPaymentStatus"
                                                >
                                                    포인트 결제 상태
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* REPORT */}
                                    <NavCollapse
                                        id="entity-report-collapes"
                                        title="신고"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/report"
                                                >
                                                    신고
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/reportEnum"
                                                >
                                                    신고 ENUM
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* FILE */}
                                    <NavCollapse
                                        id="entity-file-collapes"
                                        title="파일"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/file"
                                                >
                                                    파일
                                                </Nav.Link>
                                            </>
                                        }
                                    />
                                </>
                            }
                        ></NavCollapse>

                        <NavCollapse
                            id="logger-collapse"
                            title="Logger"
                            items={
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to="/admin/logger/response"
                                    >
                                        Response
                                    </Nav.Link>
                                </>
                            }
                        ></NavCollapse>

                        <NavCollapse
                            id="page-collapse"
                            title="외부 링크"
                            items={
                                <>
                                    <Nav.Link
                                        href={`${process.env.BE_URL}/api-docs`}
                                        target="_blank"
                                    >
                                        Swagger
                                    </Nav.Link>

                                    <Nav.Link
                                        href={`${process.env.BE_URL}/graphql`}
                                        target="_blank"
                                    >
                                        GraphQL
                                    </Nav.Link>
                                </>
                            }
                        ></NavCollapse>
                    </Nav>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Code Camp
                </div>
            </Nav>
        </div>
    );
}
