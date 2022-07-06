import {
    Injectable,
    ConflictException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { MESSAGES } from '../../commons/message/Message.enum';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentCheckService {
    constructor() {}

    ///////////////////////////////////////////////////////////////////
    // 검사 //

    /**
     * 결제 정보가 존재하는지 검사
     * @param payments
     */
    checkValidPayment(
        payments: PaymentEntity[], //
    ): void {
        if (payments.length === 0) {
            throw new ConflictException(
                MESSAGES.PAYMENT_UNVALID, //
            );
        }
    }

    /**
     * 이미 취소되었는지 검사
     * @param sum
     */
    checkAlreadyCancel(
        sum: number, //
    ): void {
        if (sum === 0) {
            throw new UnprocessableEntityException(
                MESSAGES.PAYMENT_ALREADY_CANCEL, //
            );
        }
    }
}
