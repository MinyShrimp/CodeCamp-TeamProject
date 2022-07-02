import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'auth_phone' })
@ObjectType({ description: '저자 Entity' })
export class PhoneEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    phone: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    token: string;

    @Column({ default: false })
    @Field(() => Boolean)
    isAuth: boolean;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne(
        () => UserEntity, //
        (user) => user.authPhone,
        { cascade: true, onDelete: 'CASCADE' },
    )
    @JoinColumn()
    user: UserEntity;
}
