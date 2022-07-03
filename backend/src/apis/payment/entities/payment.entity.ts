import { PaymentStatusEntity } from 'src/apis/paymentStatus/entities/paymentStatus.entity';
import { ProductEntity } from 'src/apis/product/entities/product.entity';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'payment' })
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    impUid: string;

    @Column()
    merchantUid: string;

    @Column()
    amount: number;

    @CreateDateColumn()
    createAt: Date;

    @ManyToOne(
        () => UserEntity, //
    )
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(
        () => ProductEntity, //
    )
    @JoinColumn()
    product: ProductEntity;

    @OneToOne(
        () => PaymentStatusEntity, //
    )
    @JoinColumn()
    status: PaymentStatusEntity;
}
