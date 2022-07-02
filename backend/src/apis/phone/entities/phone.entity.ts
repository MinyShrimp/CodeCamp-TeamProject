import { Field, ID, ObjectType } from '@nestjs/graphql';
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
@ObjectType({ description: '핸드폰 인증 Entity' })
export class PhoneEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true, description: '핸드폰 번호' })
    phone: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true, description: '토큰' })
    token: string;

    @Column({ default: false })
    @Field(() => Boolean, { description: '핸드폰 인증 여부' })
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
    @Field(() => UserEntity)
    user: UserEntity;
}
