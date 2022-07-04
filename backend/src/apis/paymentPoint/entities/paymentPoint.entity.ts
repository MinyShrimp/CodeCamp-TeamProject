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
import { NovelIndexEntity } from 'src/apis/novelIndex/entities/novelIndex.entity';
import { PaymentPointStatusEntity } from 'src/apis/paymentPointStatus/entities/paymentPointStatus.entity';

/* PaymentPoint Entity */
@Entity({ name: 'payment_point' })
@ObjectType({ description: '포인트 결제 Entity' })
export class PaymentPointEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column()
    @Field(() => Int, { description: '가격' })
    point: number;

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @ManyToOne(
        () => PaymentPointStatusEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => PaymentPointStatusEntity, { nullable: true })
    status: PaymentPointStatusEntity;

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity, { nullable: true })
    user: UserEntity;

    @ManyToOne(
        () => NovelIndexEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => NovelIndexEntity, { nullable: true })
    novelIndex: NovelIndexEntity;
}
