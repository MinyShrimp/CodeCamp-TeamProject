import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';
import { NovelEntity } from 'src/apis/novel/entities/novel.entity';
import { NovelIndexReviewEntity } from 'src/apis/novelIndexReview/entities/novelIndexReview.entity';
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
    OneToMany,
} from 'typeorm';

/* NovelIndex Entity */
@Entity({ name: 'novel_index' })
@ObjectType({ description: 'NovelIndex Entity' })
export class NovelIndexEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column()
    @Field(() => String, { description: '제목' })
    title: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: '내용' })
    contents: string;

    @Min(1)
    @IsInt()
    @Column()
    @Field(() => Int, { description: '몇 화' })
    index: number;

    @Min(0)
    @Max(5)
    @Column()
    @Field(() => Float, { description: '평균 별점' })
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
        () => UserEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity, { nullable: true })
    user: UserEntity;

    @ManyToOne(
        () => NovelEntity, //
        { cascade: true, onDelete: 'CASCADE' },
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
