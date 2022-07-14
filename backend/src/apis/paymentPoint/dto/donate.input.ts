import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DonatePaymentPointInput {
    @Field(() => Int, { description: '보낼 Point' })
    point: number;

    @Field(() => String, { description: '소설 UUID' })
    novelID: string;
}
