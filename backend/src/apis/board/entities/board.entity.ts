import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';
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
import { CommentEntity } from 'src/apis/comment/entities/comment.entity';
import { FileEntity } from 'src/apis/file/entities/file.entity';

/* Board Entity */
@Entity({ name: 'board' })
@ObjectType({ description: '게시판 Entity' })
export class BoardEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column()
    @Field(() => String, { description: '제목' })
    title: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: '내용' })
    contents: string;

    @Min(0)
    @IsInt()
    @Column({ default: 0, unsigned: true })
    @Field(() => Int, { description: '좋아요 갯수' })
    likeCount: number;

    @Min(0)
    @IsInt()
    @Column({ default: 0, unsigned: true })
    @Field(() => Int, { description: '싫어요 갯수' })
    dislikeCount: number;

    @Min(0)
    @IsInt()
    @Column({ default: 0, unsigned: true })
    @Field(() => Int, { description: '조회수' })
    viewCount: number;

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @UpdateDateColumn()
    @Field(() => Date, { description: '수정 시간' })
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToMany(
        () => FileEntity,
        (file) => file.novel, //
    )
    @Field(() => [FileEntity])
    files: FileEntity[];

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn({ name: 'userId' })
    @Field(() => UserEntity, { nullable: true })
    user: UserEntity;

    @OneToMany(
        () => CommentEntity, //
        (comment) => comment.board,
    )
    @Field(() => [CommentEntity])
    comments: CommentEntity[];
}
