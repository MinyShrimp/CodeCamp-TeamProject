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

import { UserEntity } from 'src/apis/user/entities/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'auth_email' })
@ObjectType({ description: '이메일 인증 Entity' })
export class EmailEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String, { description: '이메일' })
    email: string;

    @Column()
    @Field(() => String, { description: '토큰' })
    token: string;

    @Column({ default: false })
    @Field(() => Boolean, { description: '인증 여부' })
    isAuth: boolean;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne(
        () => UserEntity, //
        (user) => user.authEmail,
        { cascade: true, onDelete: 'CASCADE' },
    )
    @JoinColumn()
    @Field(() => UserEntity)
    user: UserEntity;
}
