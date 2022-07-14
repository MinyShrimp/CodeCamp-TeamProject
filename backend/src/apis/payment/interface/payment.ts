import { PAYMENT_STATUS } from 'src/apis/paymentStatus/interface/status';
import { PaymentEntity } from '../entities/payment.entity';

export interface IPaymentFind
    extends Pick<PaymentEntity, 'impUid' | 'merchantUid'> {}

export interface IPaymentInput
    extends IPaymentFind,
        Pick<PaymentEntity, 'amount' | 'reason'> {}

export interface IWebhook extends IPaymentFind {
    status: 'paid' | 'ready' | 'failed' | 'cancelled';
}

export interface IIamPort extends IPaymentInput {
    statusID: PAYMENT_STATUS;
}

export interface IIamPortCancel extends IIamPort {
    reason: string;
}
