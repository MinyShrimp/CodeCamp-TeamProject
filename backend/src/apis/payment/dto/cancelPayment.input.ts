import { InputType, PickType } from '@nestjs/graphql';
import { PaymentEntity } from '../entities/payment.entity';

@InputType()
export class CancelPaymentInput extends PickType(
    PaymentEntity,
    ['impUid', 'merchantUid'],
    InputType,
) {}
