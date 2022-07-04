import { CreatePaymentPointStatusAdminInput } from './createPaymentPointStatus.admin.input';
export interface UpdatePaymentPointStatusAdminInput
    extends Partial<CreatePaymentPointStatusAdminInput> {
    originID: string;
}
