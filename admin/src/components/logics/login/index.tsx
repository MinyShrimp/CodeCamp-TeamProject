import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { BatteryAlert } from '@material-ui/icons';
import { Button, IconButton, Input, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import { LogicHeader } from '../header';
import {
    CardBody,
    CardFooter,
    CardStyle,
    Container,
    InputGroup,
    Label,
} from '../style';
import { sendGraphQL } from '../sendGraphQL';

// @ts-ignore
import imgGoogle from '../../../assets/img/google.png';
// @ts-ignore
import imgKakao from '../../../assets/img/kakao.png';
// @ts-ignore
import imgNaver from '../../../assets/img/naver.png';

export function LogicLoginIndex() {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('');
    const navi = useNavigate();

    const input = useRef<{ email: string; pwd: string }>({
        email: '',
        pwd: '',
    });

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            navi('/admin/logic/logout');
        }
        return () => {};
    }, []);

    const submit = async () => {
        try {
            const { data, message } = await sendGraphQL({
                query: `mutation { Login( loginInput: { email: "${input.current.email}", pwd: "${input.current.pwd}" } ) }`,
            });

            if (data) {
                localStorage.setItem('access_token', data['Login']);
                navi('/admin/entity/user');
            } else {
                setShowAlert(true);
                setAlertMsg(message as string);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const oauth = async (path: 'google' | 'naver' | 'kakao') => {
        location.href = `${process.env.BE_URL}/login/${path}`;
    };

    return (
        <>
            <LogicHeader entityName="Login" />
            <Container>
                <CardStyle>
                    <h1 className="mb-3" style={{ textAlign: 'center' }}>
                        Login
                    </h1>
                    <CardBody>
                        {showAlert ? (
                            <Alert
                                variant="warning"
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <BatteryAlert />
                                {alertMsg}
                            </Alert>
                        ) : (
                            <></>
                        )}

                        <InputGroup>
                            <Label htmlFor="email">
                                <Typography>Email</Typography>
                            </Label>
                            <Input
                                style={{ width: '100%' }}
                                id="email"
                                name="email"
                                type="email"
                                onChange={(e) => {
                                    input.current.email = e.target.value;
                                }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="pwd">
                                <Typography>Password</Typography>
                            </Label>
                            <Input
                                style={{ width: '100%' }}
                                id="pwd"
                                name="pwd"
                                type="password"
                                onChange={(e) => {
                                    input.current.pwd = e.target.value;
                                }}
                            />
                        </InputGroup>
                        <CardFooter>
                            <div>
                                <IconButton
                                    style={{
                                        marginRight: '1rem',
                                        background: 'var(--bs-gray-300)',
                                        padding: '0.25em',
                                    }}
                                    onClick={() => oauth('google')}
                                >
                                    <img
                                        width="35px"
                                        height="35px"
                                        src={imgGoogle}
                                        alt="google"
                                    />
                                </IconButton>
                                <IconButton
                                    style={{
                                        marginRight: '1rem',
                                        background: '#FEE500',
                                        padding: '0.25em',
                                    }}
                                    onClick={() => oauth('kakao')}
                                >
                                    <img
                                        width="35px"
                                        height="35px"
                                        src={imgKakao}
                                        alt="google"
                                    />
                                </IconButton>
                                <IconButton
                                    style={{
                                        marginRight: '1rem',
                                        background: '#2DB400',
                                        padding: '0.25em',
                                    }}
                                    onClick={() => oauth('naver')}
                                >
                                    <img
                                        width="35px"
                                        height="35px"
                                        src={imgNaver}
                                        alt="google"
                                    />
                                </IconButton>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={submit}
                            >
                                Submit
                            </Button>
                        </CardFooter>
                    </CardBody>
                </CardStyle>
            </Container>
        </>
    );
}

// import { LogicFactory } from '../logic_factory';

// export const LogicLoginIndex = LogicFactory.createIndex({
//     name: 'Login',
// });
