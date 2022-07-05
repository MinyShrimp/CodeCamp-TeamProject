import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * 결제 상태 Entity
 *
 * | id        | description |
 * | --------- | ----------- |
 * | PAID      | 결제 완료   |
 * | CANCELLED | 결제 취소   |
 */
@Entity({ name: 'payment_status' })
@ObjectType({ description: '결제 상태 Entity' })
export class PaymentStatusEntity {
    @PrimaryColumn({ unique: true, nullable: false })
    @Field(() => String, { description: 'KEY' })
    id: string;

    @Column()
    @Field(() => String, { description: '설명' })
    description: string;
}
