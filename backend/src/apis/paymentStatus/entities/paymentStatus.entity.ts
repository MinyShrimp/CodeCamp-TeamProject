import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String, { description: '설명' })
    description: string;
}
