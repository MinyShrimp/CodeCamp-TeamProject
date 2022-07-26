import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    Column,
    ManyToOne,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from 'src/apis/user/entities/user.entity';
import { CommentEntity } from 'src/apis/comment/entities/comment.entity';

/* CommentLike Entity */
@Entity({ name: 'comment_like' })
@ObjectType({ description: 'CommentLike Entity' })
export class CommentLikeEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'CASCADE' },
    )
    @Field(() => UserEntity)
    user: UserEntity;

    @Column({ name: 'userId', nullable: true })
    userID: string;

    @ManyToOne(
        () => CommentEntity, //
        { cascade: true, onDelete: 'CASCADE' },
    )
    @Field(() => CommentEntity)
    comment: CommentEntity;

    @Column({ name: 'commentId', nullable: true })
    commentID: string;
}
