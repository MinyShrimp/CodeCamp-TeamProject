import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from 'src/apis/user/entities/user.entity';
import { ProductEntity } from 'src/apis/product/entities/product.entity';
import { PaymentStatusEntity } from 'src/apis/paymentStatus/entities/paymentStatus.entity';

@Entity({ name: 'payment' })
@ObjectType({ description: '결제 Entity' })
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column()
    @Field(() => String, { description: '아임포트 UID' })
    impUid: string;

    @Column()
    @Field(() => String, { description: '아임포트 상품 UID' })
    merchantUid: string;

    @Column()
    @Field(() => Int, { description: '결제 금액' })
    amount: number;

    @Column({ nullable: true })
    @Field(() => String, { description: '취소 사유', nullable: true })
    reason?: string;

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @ManyToOne(
        () => UserEntity, //
    )
    @JoinColumn()
    @Field(() => UserEntity)
    user: UserEntity;

    @ManyToOne(
        () => ProductEntity, //
    )
    @JoinColumn()
    @Field(() => ProductEntity)
    product: ProductEntity;

    @ManyToOne(
        () => PaymentStatusEntity, //
    )
    @JoinColumn()
    @Field(() => PaymentStatusEntity)
    status: PaymentStatusEntity;
}
