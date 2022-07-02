import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 회원 등급 Entity
 *
 * | id  | name      | description |
 * | --- | --------- | ----------- |
 * | 0   | USER      | 일반 유저   |
 * | 1   | AUTHOR    | 인증 작가   |
 * | 2   | SUB_ADMIN | 중간 관리자 |
 * | 3   | ADMIN     | 총 관리자   |
 */
@Entity({ name: 'user_class' })
@ObjectType({ description: '회원 등급 Entity' })
export class UserClassEntity {
    @PrimaryGeneratedColumn('identity')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String, { description: '이름' })
    name: string;

    @Column()
    description: string;

    @OneToOne(
        () => UserEntity,
        (user) => user.userClass, //
    )
    user: UserEntity;
}
