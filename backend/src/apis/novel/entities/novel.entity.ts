import { IsInt, Min } from 'class-validator';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    JoinTable,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from 'src/apis/user/entities/user.entity';
import { NovelTagEntity } from 'src/apis/novelTag/entities/novelTag.entity';

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

    @Column()
    @Field(() => String, { description: '소제목' })
    subtitle: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: '설명' })
    description: string;

    @Min(0)
    @IsInt()
    @Column({ unsigned: true })
    @Field(() => Int, { description: '좋아요 갯수' })
    likeCount: number;

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

    @ManyToMany(
        () => NovelTagEntity, //
        (tag) => tag.novels,
    )
    @JoinTable()
    @Field(() => [NovelTagEntity])
    novelTags: NovelTagEntity[];
}
