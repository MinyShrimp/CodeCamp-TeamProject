import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Page_Container } from '../styles/styled';

export function LoginPage() {
    const id = useRef('');
    const pwd = useRef('');
    const [isAlert, setIsAlert] = useState(false);
    const navigate = useNavigate();

    const admin = {
        id: process.env.ADMIN_ID,
        pwd: process.env.ADMIN_PWD,
    };

    const Login = () => {
        if (
            admin.id === id.current && //
            admin.pwd === pwd.current
        ) {
            window.localStorage.setItem(
                'admin',
                hashSync(admin.pwd, genSaltSync()),
            );
            navigate('/admin', { replace: true });
        } else {
            setIsAlert(true);
            setTimeout(() => {
                setIsAlert(false);
            }, 3000);
        }
    };

    return (
        <Container as={Page_Container} style={{ height: '100vh' }}>
            <Card
                style={{
                    width: '30rem',
                    padding: '1rem',
                    boxShadow: '0px 0px 30px 0px var(--bs-primary)',
                }}
            >
                <Card.Body>
                    <div style={{ textAlign: 'center' }}>
                        <h2 className="mb-3 mt-3">Login</h2>
                    </div>

                    <div className="mb-3">
                        <Form.Label htmlFor="id"> ID </Form.Label>
                        <Form.Control
                            type="id"
                            id="id"
                            onChange={(e) => {
                                id.current = e.target.value;
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    Login();
                                }
                            }}
                        ></Form.Control>
                    </div>

                    <div className="mb-3">
                        <Form.Label htmlFor="pwd"> Password </Form.Label>
                        <Form.Control
                            type="password"
                            id="pwd"
                            onChange={(e) => {
                                pwd.current = e.target.value;
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    Login();
                                }
                            }}
                        ></Form.Control>
                    </div>

                    {isAlert ? (
                        <Alert variant="danger" style={{ textAlign: 'center' }}>
                            {' '}
                            아이디 또는 비밀번호가 다릅니다.{' '}
                        </Alert>
                    ) : null}

                    <div>
                        <Button variant="primary" onClick={Login}>
                            Submit
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
