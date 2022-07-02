import { sendGraphQL, sendGraphQLWithAuth } from '../sendGraphQL';
import { LogicHeader } from '../header';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CardStyle, Container } from '../style';
import { AttachMoney, Email, Forward, PhoneIphone } from '@material-ui/icons';
import { Subtitle } from '../style';
import { IUserInfo } from './interface';

export function LogicLogoutIndex() {
    const navi = useNavigate();
    const [info, setInfo] = useState<IUserInfo>({
        id: '',
        email: '',
        name: '',
        point: 0,
        phone: '',
    });

    const submit = async () => {
        const { status } = await sendGraphQLWithAuth({
            query: `mutation { Logout { id, msg } }`,
        });

        if (status) {
            localStorage.removeItem('access_token');
            navi('/admin/entity/user');
        } else {
            navi('/auth/token', { state: '/admin/logic/logout' });
        }
    };

    const getLoginUser = async (): Promise<void> => {
        const { status, data } = await sendGraphQLWithAuth({
            query: `query { fetchLoginUser { id, name, email, point, phone } }`,
        });

        if (status) {
            if (data['fetchLoginUser']) {
                setInfo(data['fetchLoginUser']);
            }
        } else {
            navi('/auth/token', { state: '/admin/logic/logout' });
        }
    };

    useEffect(() => {
        getLoginUser();
    }, []);

    return (
        <>
            <LogicHeader entityName="Logout" />
            <Container style={{ fontFamily: 'SCDream !important' }}>
                <CardStyle
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <h3>{info.name}</h3>
                        <Subtitle>
                            <Forward
                                style={{ marginRight: '0.5rem' }}
                                fontSize="small"
                            />{' '}
                            {info.id}
                        </Subtitle>
                        <Subtitle>
                            <Email
                                style={{ marginRight: '0.5rem' }}
                                fontSize="small"
                            />{' '}
                            {info.email}
                        </Subtitle>
                        <Subtitle>
                            <PhoneIphone
                                style={{ marginRight: '0.5rem' }}
                                fontSize="small"
                            />{' '}
                            {info.phone}
                        </Subtitle>
                        <Subtitle>
                            <AttachMoney
                                style={{ marginRight: '0.5rem' }}
                                fontSize="small"
                            />{' '}
                            {info.point}
                        </Subtitle>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            height: '120px',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submit}
                        >
                            Logout
                        </Button>
                    </div>
                </CardStyle>
            </Container>
        </>
    );
}
