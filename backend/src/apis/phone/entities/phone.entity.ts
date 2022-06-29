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
} from 'typeorm';

@Entity({ name: 'phone' })
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

    @OneToOne(
        () => UserEntity, //
        (user) => user.phoneAuth,
        { cascade: true, onDelete: 'CASCADE' },
    )
    @JoinColumn()
    user: UserEntity;
}
