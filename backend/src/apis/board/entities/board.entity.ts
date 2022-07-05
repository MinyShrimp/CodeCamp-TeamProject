import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';
import { CommentEntity } from 'src/apis/comment/entities/comment.entity';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

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
    @Column()
    @Field(() => Int, { description: '좋아요 갯수' })
    likeCount: number;

    @Min(0)
    @IsInt()
    @Column()
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
        () => UserEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity)
    user: UserEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    @Field(() => [CommentEntity])
    comment: CommentEntity[];
}
