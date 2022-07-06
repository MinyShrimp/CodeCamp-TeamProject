import axios from 'axios';
import {
    Injectable,
    ConflictException,
    UnprocessableEntityException,
} from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';

import { IIamPort } from './interface/payment';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentRepository } from './entities/payment.repository';
import { CreatePaymentInput } from './dto/createPayment.input';

@Injectable()
export class IMPService {
    constructor(
        private readonly paymentRepository: PaymentRepository, //
    ) {}

    private readonly baseURL = 'https://api.iamport.kr';

    /**
     * 아임포트 AccessToken 가져오기
     */
    async getToken(): Promise<string> {
        const getToken = await axios.post(
            `${this.baseURL}/users/getToken`, //
            {
                imp_key: process.env.IMP_API_KEY,
                imp_secret: process.env.IMP_API_SECRET,
            },
        );
        return getToken.data.response.access_token;
    }

    ///////////////////////////////////////////////////////////////////
    // 새로운 결제 정보 생성 //

    /**
     * 아임포트 결제 정보 가져오기
     * @returns 결제 정보
     */
    async getPaymentData(
        impUid: string, //
        accessToken: string,
    ): Promise<IIamPort> {
        const getPaymentData = await axios.get(
            `${this.baseURL}/payments/${impUid}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        const res = getPaymentData.data.response;
        return {
            impUid: res.imp_uid,
            merchantUid: res.merchant_uid,
            amount: res.amount,
            statusID: res.status.toUpperCase(),
        };
    }

    /**
     * DB에 중복된 Uid가 있는지 검사
     * @param impUid
     */
    async checkOverlapUID(
        impUid: string, //
    ): Promise<void> {
        const count = await this.paymentRepository.count({
            where: { impUid: impUid },
        });
        if (count !== 0) {
            throw new ConflictException(MESSAGES.PAYMENT_OVERLAP_UID);
        }
    }

    /**
     * Reqeust Data 검증
     * @param createPaymentInput
     * @param impRequestData
     */
    checkData(
        createPaymentInput: CreatePaymentInput,
        impRequestData: IIamPort, //
    ): void {
        // impUid 검증
        // MerchantUid 검증
        // 금액 검증
        // 상태 검증
        if (
            impRequestData.impUid !== createPaymentInput.impUid ||
            impRequestData.merchantUid !== createPaymentInput.merchantUid ||
            impRequestData.amount !== createPaymentInput.amount ||
            impRequestData.statusID.toUpperCase() !== 'PAID'
        ) {
            throw new UnprocessableEntityException(
                MESSAGES.UNVLIAD_ACCESS, //
            );
        }
    }

    /**
     * 아임포트에 데이터 보내기
     */
    async sendData(
        impUid: string, //
    ): Promise<IIamPort> {
        try {
            const accessToken = await this.getToken();
            return await this.getPaymentData(impUid, accessToken);
        } catch (e) {
            throw new UnprocessableEntityException(
                MESSAGES.UNVLIAD_ACCESS, //
            );
        }
    }

    ///////////////////////////////////////////////////////////////////
    // 결제 취소 //

    /**
     * 결제 취소 아임포트에 보내기
     * @param payment
     * @param checksum
     * @param accessToken
     * @returns 아임포트에서 받은 데이터
     */
    private async getCancelData(
        payment: PaymentEntity, //
        checksum: number,
        accessToken: string,
    ): Promise<IIamPort> {
        const getCancelData = await axios.post(
            `${this.baseURL}/payments/cancel`, //
            {
                imp_uid: payment.impUid,
                merchant_uid: payment.merchantUid,
                reason: '테스트',
                amount: payment.amount,
                checksum: checksum,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        const res = getCancelData.data.response;
        return {
            impUid: res.imp_uid,
            merchantUid: res.merchant_uid,
            amount: res.cancel_amount * -1,
            statusID: res.status.toUpperCase(),
        };
    }

    /**
     * 아임포트에 결제 정보 보내기
     * @param payment
     * @param checksum
     * @returns 아임포트에서 받은 결과 정보
     */
    async sendCancelData(
        payment: PaymentEntity, //
        checksum: number,
    ): Promise<IIamPort> {
        try {
            const accessToken = await this.getToken();
            return await this.getCancelData(payment, checksum, accessToken);
        } catch (e) {
            throw new UnprocessableEntityException(
                MESSAGES.UNVLIAD_ACCESS, //
            );
        }
    }
}
