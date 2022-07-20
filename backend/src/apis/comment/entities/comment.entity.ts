import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';
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

import { UserEntity } from 'src/apis/user/entities/user.entity';
import { BoardEntity } from 'src/apis/board/entities/board.entity';

/* Comment Entity */
@Entity({ name: 'comment' })
@ObjectType({ description: '댓글 Entity' })
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

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

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @UpdateDateColumn()
    @Field(() => Date, { description: '수정 시간' })
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne(
        () => BoardEntity, //
        { cascade: true, onDelete: 'CASCADE' },
    )
    @JoinColumn()
    @Field(() => BoardEntity)
    board: BoardEntity;

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity)
    user: UserEntity;

    // 댓글 부모
    @ManyToOne(() => CommentEntity, (cmt) => cmt.children)
    parent: CommentEntity;

    @Column({ name: 'parentId', nullable: true })
    parentID: string;

    // 댓글 자식 - 대댓글
    @OneToMany(() => CommentEntity, (cmt) => cmt.parent)
    @Field(() => [CommentEntity], { description: '대댓글' })
    children: CommentEntity[];
}
