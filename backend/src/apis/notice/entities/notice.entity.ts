import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* Notice Entity */
@Entity({ name: 'notice' })
@ObjectType({ description: '공지 Entity' })
export class NoticeEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String, { description: '제목' })
    title: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: '내용' })
    contents: string;

    @Column({ default: false })
    @Field(() => Boolean, { description: '상단 노출 여부' })
    isTop: boolean;

    @CreateDateColumn()
    @Field(() => Date)
    createAt: Date;

    @UpdateDateColumn()
    @Field(() => Date)
    updateAt: Date;

    @DeleteDateColumn()
    @Field(() => Date)
    deleteAt: Date;
}
