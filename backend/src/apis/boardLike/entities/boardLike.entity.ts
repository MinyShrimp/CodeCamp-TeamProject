import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

/* BoardLike Entity */
@Entity({ name: 'boardLike' })
@ObjectType({ description: 'BoardLike Entity' })
export class BoardLikeEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;
}
