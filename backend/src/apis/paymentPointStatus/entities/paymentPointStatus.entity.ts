import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * PaymentPointStatus Entity
 *
 * | id        | description |
 * | --------- | ----------- |
 * | NORMAL    | 일반 결제   |
 * | DONATE    | 후원 결제   |
 * | SUBSCRIBE | 구독 결제   |
 * | CANCELLED | 결제 취소   |
 */
@Entity({ name: 'payment_point_status' })
@ObjectType({ description: '포인트 결제 상태 Entity' })
export class PaymentPointStatusEntity {
    @PrimaryColumn({ unique: true, nullable: false })
    @Field(() => String, { description: 'KEY' })
    id: string;

    @Column()
    @Field(() => String, { description: '설명' })
    description: string;
}
