import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from 'src/apis/user/entities/user.entity';

/* User_block Entity */
@Entity({ name: 'user_block' })
@ObjectType({ description: '차단 회원 Entity' })
export class UserBlockEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @CreateDateColumn()
    @Field(() => Date, { description: '등록한 시간' })
    createAt: Date;

    @ManyToOne(
        () => UserEntity, //
        { onDelete: 'SET NULL' },
    )
    from: UserEntity;

    @ManyToOne(
        () => UserEntity, //
        { onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity, { description: '대상 회원' })
    to: UserEntity;
}
