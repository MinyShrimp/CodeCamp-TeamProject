import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';
import {
    Entity,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from 'src/apis/user/entities/user.entity';
import { NovelEntity } from 'src/apis/novel/entities/novel.entity';
import { NovelIndexReviewEntity } from 'src/apis/novelIndexReview/entities/novelIndexReview.entity';

/* NovelIndex Entity */
@Entity({ name: 'novel_index' })
@ObjectType({ description: 'NovelIndex Entity' })
export class NovelIndexEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: '에피소드 UUID' })
    id: string;

    @Column()
    @Field(() => String, { description: '제목' })
    title: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: '내용' })
    contents: string;

    @Min(0)
    @IsInt()
    @Column({ unsigned: true })
    @Field(() => Int, { description: '몇 화' })
    index: number;

    @Min(0)
    @Max(5)
    @Column({
        type: 'decimal',
        default: 0,
        unsigned: true,
        precision: 2,
        scale: 1,
    })
    @Field(() => Float, { description: '평균 별점' })
    star: number;

    @Min(0)
    @IsInt()
    @Column({ default: 0, unsigned: true })
    @Field(() => Int, { description: '조회수' })
    viewCount: number;

    @Column({ type: 'text' })
    @Field(() => String, { description: '작가의 말' })
    authorText: string;

    @Column()
    @Field(() => Boolean, { description: '공지 여부' })
    isNotice: boolean;

    @Column()
    @Field(() => Boolean, { description: '완결 여부' })
    isFinish: boolean;

    @Column({ default: false })
    @Field(() => Boolean, { description: '비공개 여부' })
    isPrivate: boolean;

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @UpdateDateColumn()
    @Field(() => Date, { description: '수정 시간' })
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne(
        () => UserEntity, //
        { cascade: ['remove'], onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity, { nullable: true })
    user: UserEntity;

    @ManyToOne(
        () => NovelEntity, //
        { cascade: ['remove'], onDelete: 'CASCADE' },
    )
    @JoinColumn()
    @Field(() => NovelEntity)
    novel: NovelEntity;

    @OneToMany(
        () => NovelIndexReviewEntity, //
        (review) => review.novelIndex,
    )
    @Field(() => [NovelIndexReviewEntity])
    novelIndexReviews: NovelIndexReviewEntity[];
}
