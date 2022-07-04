import { CreatePaymentPointAdminInput } from './createPaymentPoint.admin.input';
export interface UpdatePaymentPointAdminInput
    extends Partial<CreatePaymentPointAdminInput> {
    originID: string;
}
