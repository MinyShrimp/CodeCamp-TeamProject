import { PaymentPointStatusEntity } from '../entities/paymentPointStatus.entity';
export interface CreatePaymentPointStatusAdminInput extends Omit<PaymentPointStatusEntity, 'id'> {}
