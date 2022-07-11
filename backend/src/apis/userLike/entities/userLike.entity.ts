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

/* User_like Entity */
@Entity({ name: 'user_like' })
@ObjectType({ description: '선호 작가 Entity' })
export class UserLikeEntity {
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

    @Column({ name: 'toId', nullable: true })
    toID: string;
}
