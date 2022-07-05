import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * 회원 등급 Entity
 *
 * | id        | description |
 * | --------- | ----------- |
 * | USER      | 일반 유저   |
 * | AUTHOR    | 인증 작가   |
 * | SUB_ADMIN | 중간 관리자 |
 * | ADMIN     | 총 관리자   |
 */
@Entity({ name: 'user_class' })
@ObjectType({ description: '회원 등급 Entity' })
export class UserClassEntity {
    @PrimaryColumn({ unique: true, nullable: false })
    @Field(() => String, { description: 'KEY' })
    id: string;

    @Column()
    description: string;
}
