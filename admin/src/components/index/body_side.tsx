import React, { ReactElement, useState } from 'react';
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
                            title="Entities"
                            items={
                                <>
                                    {/****************************************************************************/}
                                    {/* USER */}
                                    <Nav.Link as={Link} to="/admin/entity/user">
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
                                    <hr />

                                    {/****************************************************************************/}
                                    {/* PRODUCT */}
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
                                    <hr />

                                    {/****************************************************************************/}
                                    {/* QUESTION */}
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
                                    <hr />

                                    {/****************************************************************************/}
                                    {/* FILE */}
                                    <Nav.Link as={Link} to="/admin/entity/file">
                                        파일
                                    </Nav.Link>
                                </>
                            }
                        ></NavCollapse>

                        <NavCollapse
                            id="page-collapse"
                            title="Redis"
                            items={<></>}
                        ></NavCollapse>

                        <NavCollapse
                            id="page-collapse"
                            title="Pages"
                            items={
                                <>
                                    <Nav.Link as={Link} to="/admin/401">
                                        401 Page
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/404">
                                        404 Page
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/admin/500">
                                        500 Page
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
