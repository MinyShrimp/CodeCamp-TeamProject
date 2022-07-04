import { PaymentPointEntity } from '../entities/paymentPoint.entity';
export interface CreatePaymentPointAdminInput extends Omit<PaymentPointEntity, 'id'> {}
