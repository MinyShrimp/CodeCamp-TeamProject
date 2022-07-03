import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product' })
@ObjectType({ description: '상품 Entity' })
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String, { description: '이름' })
    name: string;

    @Column()
    @Field(() => String, { description: '설명' })
    description: string;

    @Min(0)
    @IsInt()
    @Column({ type: 'int', unsigned: true })
    @Field(() => Int, { description: '제공하는 포인트' })
    price: number;

    @Min(0)
    @IsInt()
    @Column({ type: 'int', unsigned: true })
    @Field(() => Int, { description: '가격' })
    point: number;
}
