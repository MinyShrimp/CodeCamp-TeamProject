import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaymentEntity } from '../entities/payment.entity';

@ObjectType()
export class FetchPaymentOutput {
    @Field(() => [PaymentEntity], { description: '결제 목록' })
    payments: Array<PaymentEntity>;

    @Field(() => Int, { description: '전체 갯수' })
    count: number;
}
