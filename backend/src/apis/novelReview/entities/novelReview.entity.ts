import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { NovelEntity } from 'src/apis/novel/entities/novel.entity';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* NovelReview Entity */
@Entity({ name: 'nove_review' })
@ObjectType({ description: '소설 리뷰 Entity' })
export class NovelReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: '내용' })
    contents: string;

    @Min(0)
    @Column()
    @Field(() => Int, { description: '좋아요 갯수' })
    likeCount: number;

    @Min(0)
    @Column()
    @Field(() => Int, { description: '싫어요 갯수' })
    dislikeCount: number;

    @Min(0)
    @Max(5)
    @Column({ type: 'decimal', precision: 2, scale: 1 })
    @Field(() => Float, { description: '평점' })
    star: number;

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @UpdateDateColumn()
    @Field(() => Date, { description: '수정 시간' })
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne(
        () => NovelEntity, //
        { cascade: true, onDelete: 'CASCADE' },
    )
    @JoinColumn()
    @Field(() => NovelEntity)
    novel: NovelEntity;

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'CASCADE' },
    )
    @JoinColumn()
    @Field(() => UserEntity)
    user: UserEntity;
}
