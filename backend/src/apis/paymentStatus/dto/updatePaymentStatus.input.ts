import { PaymentStatusEntity } from '../entities/paymentStatus.entity';

export interface UpdatePaymentStatusInput extends Partial<PaymentStatusEntity> {
    originID: string;
}
