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
                            title="?????????"
                            items={
                                <>
                                    {/****************************************************************************/}
                                    {/* USER */}
                                    <NavCollapse
                                        id="entity-user-collapes"
                                        title="??????"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/user"
                                                >
                                                    ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/userClass"
                                                >
                                                    ?????? ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/authPhone"
                                                >
                                                    ????????? ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/authEmail"
                                                >
                                                    ????????? ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelDonate"
                                                >
                                                    ?????????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelLike"
                                                >
                                                    ?????????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/bookMark"
                                                >
                                                    ?????????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/userBlock"
                                                >
                                                    ????????? ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/userLike"
                                                >
                                                    ???????????? ??????
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* PRODUCT */}
                                    <NavCollapse
                                        id="entity-product-collapes"
                                        title="??????"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/product"
                                                >
                                                    ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/payment"
                                                >
                                                    ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/paymentStatus"
                                                >
                                                    ?????? ??????
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* QUESTION */}
                                    <NavCollapse
                                        id="entity-question-collapes"
                                        title="??????"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/question"
                                                >
                                                    ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/answer"
                                                >
                                                    ??????
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* BOARD */}
                                    <NavCollapse
                                        id="entity-board-collapes"
                                        title="?????????"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/notice"
                                                >
                                                    ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/event"
                                                >
                                                    ?????????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/board"
                                                >
                                                    ?????? ?????????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/comment"
                                                >
                                                    ?????? ????????? ??????
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* NOVEL */}
                                    <NavCollapse
                                        id="entity-novel-collapes"
                                        title="??????"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novel"
                                                >
                                                    ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelReview"
                                                >
                                                    ?????? ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelIndex"
                                                >
                                                    ?????? ?????????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelIndexReview"
                                                >
                                                    ?????? ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelTag"
                                                >
                                                    ?????? ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/novelCategory"
                                                >
                                                    ?????? ????????????
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* POINT PAYMENT */}
                                    <NavCollapse
                                        id="entity-point-payment-collapes"
                                        title="????????? ??????"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/pointPayment"
                                                >
                                                    ????????? ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/pointPaymentStatus"
                                                >
                                                    ????????? ?????? ??????
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* REPORT */}
                                    <NavCollapse
                                        id="entity-report-collapes"
                                        title="??????"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/report"
                                                >
                                                    ??????
                                                </Nav.Link>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/reportEnum"
                                                >
                                                    ?????? ENUM
                                                </Nav.Link>
                                            </>
                                        }
                                    />

                                    {/****************************************************************************/}
                                    {/* FILE */}
                                    <NavCollapse
                                        id="entity-file-collapes"
                                        title="??????"
                                        items={
                                            <>
                                                <Nav.Link
                                                    as={Link}
                                                    to="/admin/entity/file"
                                                >
                                                    ??????
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
                            title="?????? ??????"
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
