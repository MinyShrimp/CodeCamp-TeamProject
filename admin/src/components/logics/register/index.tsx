import { Button, Input, MenuItem, Select, Typography } from '@material-ui/core';
import { BatteryAlert } from '@material-ui/icons';
import { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { LogicHeader } from '../header';
import { sendGraphQL } from '../sendGraphQL';
import {
    CardBody,
    CardFooter,
    CardStyle,
    Container,
    InputGroup,
    InputItemBetween,
    InputNumber,
    Label,
} from '../style';
import { TimerComponent } from '../timer';
import { IRegisterInput } from './interface';

export function LogicRegisterIndex() {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('');
    const navi = useNavigate();

    // prettier-ignore
    const phoneNumbers = [
        '010', '011', '012', '013', '014', '015', '016', '017', '018', '019'
    ];

    const input = useRef<IRegisterInput>({
        name: '',
        nickname: '',
        email: '',
        phone: ['010', '', ''],
        pwd: '',
        pwdAgain: '',
    });

    const phoneToken = useRef<string>('');
    const [isAuthSend, setIsAuthSend] = useState<boolean>(false);
    const [clickFlag, setClickFlag] = useState<boolean>(false);
    const [isAuthOK, setIsAuthOK] = useState<boolean>(false);

    const submit = async () => {
        if (input.current.pwd !== input.current.pwdAgain) {
            setShowAlert(true);
            setAlertMsg('비밀번호가 서로 다릅니다');
            return;
        }

        if (!isAuthOK) {
            setShowAlert(true);
            setAlertMsg('핸드폰 인증이 완료되지 않았습니다.');
            return;
        }

        try {
            const phone = input.current.phone.join('');
            const { data, message } = await sendGraphQL({
                query: `mutation { createUser( createUserInput: { name: "${input.current.name}", nickName: "${input.current.nickname}", email: "${input.current.email}", pwd: "${input.current.pwd}", phone: "${phone}" } ) { id } }`,
            });

            if (data) {
                navi('/admin/entity/user');
            } else {
                setShowAlert(true);
                setAlertMsg(message as string);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const authPhone = async () => {
        try {
            const phone = input.current.phone.join('');
            const { data, message } = await sendGraphQL({
                query: `query { SendPhone( phone: "${phone}" ) }`,
            });
            console.log(data, message);

            if (data) {
                setClickFlag(!clickFlag);
                setIsAuthSend(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const authPhoneOK = async () => {
        try {
            const phone = input.current.phone.join('');
            const { data, message } = await sendGraphQL({
                query: `query { AuthPhoneOK( phoneInput: { phone: "${phone}", token: "${phoneToken.current}" } ) }`,
            });
            console.log(data, message);
            if (data) {
                setIsAuthOK(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <LogicHeader entityName="Register" />
            <Container>
                <CardStyle>
                    <h1 className="mb-3" style={{ textAlign: 'center' }}>
                        회원가입
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
                            <Label htmlFor="name">
                                <Typography>이름</Typography>
                            </Label>
                            <Input
                                style={{ width: '100%' }}
                                id="name"
                                onChange={(e) => {
                                    input.current.name = e.target.value;
                                }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="nickname">
                                <Typography>닉네임</Typography>
                            </Label>
                            <Input
                                style={{ width: '100%' }}
                                id="nickname"
                                onChange={(e) => {
                                    input.current.nickname = e.target.value;
                                }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="email">
                                <Typography>Email</Typography>
                            </Label>
                            <Input
                                style={{
                                    width: '100%',
                                    marginRight: '1rem',
                                }}
                                id="email"
                                type="email"
                                onChange={(e) => {
                                    input.current.email = e.target.value;
                                }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="phone1">
                                <Typography>핸드폰 번호</Typography>
                            </Label>
                            <InputItemBetween>
                                <InputItemBetween>
                                    <Select
                                        style={{
                                            width: '100%',
                                            marginRight: '1rem',
                                        }}
                                        id="phone1"
                                        defaultValue={'010'}
                                        onChange={(e) => {
                                            input.current.phone[0] = e.target
                                                .value as string;
                                        }}
                                        disabled={isAuthOK}
                                    >
                                        {phoneNumbers.map((v, i) => {
                                            return (
                                                <MenuItem value={v} key={v4()}>
                                                    {' '}
                                                    {v}{' '}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    <InputNumber
                                        id="phone2"
                                        type="number"
                                        onChange={(e) => {
                                            input.current.phone[1] =
                                                e.target.value;
                                        }}
                                        disabled={isAuthOK}
                                    />
                                    <InputNumber
                                        id="phone3"
                                        type="number"
                                        onChange={(e) => {
                                            input.current.phone[2] =
                                                e.target.value;
                                        }}
                                        disabled={isAuthOK}
                                    />
                                </InputItemBetween>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={authPhone}
                                    disabled={isAuthOK}
                                >
                                    인증
                                </Button>
                            </InputItemBetween>
                        </InputGroup>
                        <InputGroup>
                            <InputItemBetween>
                                <InputNumber
                                    id="phone-auth"
                                    type="number"
                                    onChange={(e) => {
                                        phoneToken.current = e.target.value;
                                    }}
                                    disabled={isAuthOK || !isAuthSend}
                                />
                                <TimerComponent
                                    isStart={clickFlag}
                                    isSend={isAuthSend}
                                    isAuthOK={isAuthOK}
                                    setIsSend={setIsAuthSend}
                                    callBack={() => {
                                        setIsAuthSend(false);
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={authPhoneOK}
                                    disabled={isAuthOK || !isAuthSend}
                                >
                                    확인
                                </Button>
                            </InputItemBetween>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="pwd">
                                <Typography>비밀번호</Typography>
                            </Label>
                            <Input
                                style={{ width: '100%' }}
                                id="pwd"
                                type="password"
                                onChange={(e) => {
                                    input.current.pwd = e.target.value;
                                }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="pwd-again">
                                <Typography>비밀번호 재확인</Typography>
                            </Label>
                            <Input
                                style={{ width: '100%' }}
                                id="pwd-again"
                                type="password"
                                onChange={(e) => {
                                    input.current.pwdAgain = e.target.value;
                                }}
                            />
                        </InputGroup>
                        <CardFooter>
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
