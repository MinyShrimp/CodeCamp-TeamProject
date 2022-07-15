import { IsInt, Min } from 'class-validator';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    JoinTable,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { FileEntity } from 'src/apis/file/entities/file.entity';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import { NovelTagEntity } from 'src/apis/novelTag/entities/novelTag.entity';
import { NovelIndexEntity } from 'src/apis/novelIndex/entities/novelIndex.entity';
import { NovelReviewEntity } from 'src/apis/novelReview/entities/novelReview.entity';
import { NovelCategoryEntity } from 'src/apis/novelCategory/entities/novelCategory.entity';

/* Novel Entity */
@Entity({ name: 'novel' })
@ObjectType({ description: '소설 Entity' })
export class NovelEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column()
    @Field(() => String, { description: '제목' })
    title: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: '설명' })
    description: string;

    @Min(0)
    @IsInt()
    @Column({ unsigned: true, default: 0 })
    @Field(() => Int, { description: '좋아요 갯수' })
    likeCount: number;

    @Min(0)
    @IsInt()
    @Column({ unsigned: true, default: 0 })
    @Field(() => Int, { description: '전체 조회수' })
    viewCount: number;

    @CreateDateColumn()
    @Field(() => Date, { description: '시작 시간' })
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
    @Field(() => UserEntity)
    user: UserEntity;

    @Column({ name: 'userId', nullable: true })
    userID: string;

    @ManyToOne(
        () => NovelCategoryEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => NovelCategoryEntity)
    novelCategory: NovelCategoryEntity;

    @ManyToMany(
        () => NovelTagEntity, //
        (tag) => tag.novels,
    )
    @JoinTable()
    @Field(() => [NovelTagEntity])
    novelTags: NovelTagEntity[];

    @OneToMany(
        () => NovelIndexEntity, //
        (index) => index.novel,
    )
    @Field(() => [NovelIndexEntity])
    novelIndexs: NovelIndexEntity[];

    @OneToMany(
        () => NovelReviewEntity, //
        (review) => review.novel,
    )
    @Field(() => [NovelReviewEntity])
    novelReviews: NovelReviewEntity[];

    @OneToMany(
        () => FileEntity,
        (file) => file.novel, //
    )
    @Field(() => [FileEntity])
    files: FileEntity[];
}
