import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

/* CommentLike Entity */
@Entity({ name: 'commentLike' })
@ObjectType({ description: 'CommentLike Entity' })
export class CommentLikeEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;
}
