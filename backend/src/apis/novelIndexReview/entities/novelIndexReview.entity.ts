import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
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

import { NovelIndexEntity } from 'src/apis/novelIndex/entities/novelIndex.entity';
import { UserEntity } from 'src/apis/user/entities/user.entity';

/* NovelIndexReview Entity */
@Entity({ name: 'novel_index_review' })
@ObjectType({ description: '편당 리뷰 Entity' })
export class NovelIndexReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
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
        () => NovelIndexEntity, //
        { cascade: true, onDelete: 'CASCADE' },
    )
    @JoinColumn()
    @Field(() => NovelIndexEntity)
    novelIndex: NovelIndexEntity;

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity)
    user: UserEntity;
}
