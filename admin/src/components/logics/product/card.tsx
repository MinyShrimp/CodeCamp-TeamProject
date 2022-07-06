import { Card } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '../../../functions/functions';
import { IUserInfo } from '../logout/interface';
import { sendGraphQLWithAuth } from '../sendGraphQL';
import { IPaymentInput, IProduct } from './interface';

export function ProductCard(props: {
    product: IProduct; //
}) {
    const [user, setUser] = useState<IUserInfo>({
        id: '',
        name: '',
        email: '',
        phone: null,
    });

    async function getLoginUser() {
        const { data, status } = await sendGraphQLWithAuth({
            query: `query { fetchLoginUser { id, email, name, nickName, phone } }`,
        });

        if (status) {
            if (data.fetchLoginUser) {
                setUser(data.fetchLoginUser);
            }
        }
        return status;
    }

    async function postPayment(
        rsp: IPaymentInput, //
    ): Promise<boolean> {
        console.log(rsp);
        const { data, status } = await sendGraphQLWithAuth({
            query: `mutation { 
                createPayment ( 
                    createPaymentInput: { 
                        impUid: "${rsp.imp_uid}",
                        merchantUid: "${rsp.merchant_uid}",
                        amount: ${rsp.paid_amount},
                        productID: "${props.product.id}"
                    } 
                ) { id } 
            }`,
        });
        return status;
    }

    useEffect(() => {
        getLoginUser();
    }, []);

    const payment = async (event: any) => {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();

        const productID = props.product.id;
        const accessToken = localStorage.getItem('access_token');

        if (productID === null || accessToken === null) {
            alert('로그인 후 사용 바랍니다.');
            return;
        }

        console.log(user);

        // @ts-ignore
        const IMP = window.IMP;
        IMP.init(process.env.IMP_UID);
        IMP.request_pay(
            {
                pg: 'html5_inicis',
                pay_method: 'card',
                name: props.product.name,
                amount: props.product.price,
                buyer_email: user.email,
                buyer_name: user.name,
                buyer_tel: user.phone || '010-2011-5029',
            },
            async (rsp: any) => {
                if (rsp.success) {
                    await postPayment({
                        imp_uid: rsp.imp_uid,
                        merchant_uid: rsp.merchant_uid,
                        paid_amount: rsp.paid_amount,
                        status: rsp.status.toUpperCase(),
                    });
                } else {
                    alert(rsp.error_msg);
                }
            },
        );
    };

    return (
        <Card
            style={{
                width: '100%',
                padding: '1rem',
                cursor: 'pointer',
                marginBottom: '1rem',
            }}
            onClick={payment}
        >
            <div>
                <h6>{numberWithCommas(props.product.price)} 원</h6>
                <h3 className="mb-0">
                    {numberWithCommas(props.product.point)} P
                </h3>
            </div>
        </Card>
    );
}
