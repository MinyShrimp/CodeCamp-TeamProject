import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* NovelCategory Entity */
@Entity({ name: 'novel_category' })
@ObjectType({ description: '소설 카테고리 Entity' })
export class NovelCategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String)
    name: string;
}
