import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import {
    Entity,
    Column,
    OneToOne,
    OneToMany,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { EmailEntity } from 'src/apis/email/entities/email.entity';
import { BoardEntity } from 'src/apis/board/entities/board.entity';
import { PhoneEntity } from 'src/apis/phone/entities/phone.entity';
import { UserLikeEntity } from 'src/apis/userLike/entities/userLike.entity';
import { UserBlockEntity } from 'src/apis/userBlock/entities/userBlock.entity';
import { UserClassEntity } from 'src/apis/userClass/entities/userClass.entity';

@Entity({ name: 'user' })
@ObjectType({ description: '유저 Entity' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 이름
    @Column()
    @Field(() => String, { description: '이름' })
    name: string;

    // 닉네임
    @Column()
    @Field(() => String, { description: '닉네임' })
    nickName: string;

    // 이메일
    @Column()
    @IsEmail()
    @Field(() => String, { description: '이메일' })
    email: string;

    // 핸드폰 번호
    @Column({ nullable: true })
    @Field(() => String, { description: '핸드폰 번호', nullable: true })
    phone: string;

    // 비밀번호
    @Column()
    pwd: string;

    // 포인트
    @Column({ default: 0, unsigned: true })
    @Field(() => Int, { description: '포인트' })
    point: number;

    // 로그인 시간
    @Column({ nullable: true })
    loginAt: Date;

    // 로그아웃 시간
    @Column({ nullable: true })
    logoutAt: Date;

    // 로그인 여부
    @Column({ default: false })
    isLogin: boolean;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 업데이트 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @DeleteDateColumn()
    deleteAt: Date;

    // 유저 등급
    @ManyToOne(
        () => UserClassEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserClassEntity)
    userClass: UserClassEntity;

    @Column({ name: 'userClassId', unique: true, nullable: true })
    userClassID: string;

    // 핸드폰 인증
    @OneToOne(
        () => PhoneEntity, //
        (phone) => phone.user,
    )
    @Field(() => PhoneEntity)
    authPhone: PhoneEntity;

    // 이메일 인증
    @OneToOne(
        () => EmailEntity, //
        (email) => email.user,
    )
    @Field(() => EmailEntity)
    authEmail: EmailEntity;

    // 차단 회원
    @OneToMany(
        () => UserBlockEntity, //
        (block) => block.from,
    )
    @Field(() => [UserBlockEntity])
    userBlocks: UserBlockEntity[];

    // 선호 회원
    @OneToMany(
        () => UserLikeEntity, //
        (like) => like.from,
    )
    @Field(() => [UserLikeEntity])
    userLikes: UserLikeEntity[];

    // 게시판
    @OneToMany(() => BoardEntity, (board) => board.user)
    @Field(() => [BoardEntity])
    boards: BoardEntity[];
}
