import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from 'src/apis/user/entities/user.entity';
import { NovelIndexEntity } from 'src/apis/novelIndex/entities/novelIndex.entity';

/* Bookmark Entity */
@Entity({ name: 'bookmark' })
@ObjectType({ description: '북마크 Entity' })
export class BookmarkEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Min(0)
    @IsInt()
    @Column({ nullable: true })
    @Field(() => Int, { description: '페이지', nullable: true })
    page: number;

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'CASCADE', nullable: true },
    )
    @JoinColumn()
    @Field(() => UserEntity)
    user: UserEntity;

    @ManyToOne(
        () => NovelIndexEntity, //
        { cascade: true, onDelete: 'CASCADE', nullable: true },
    )
    @JoinColumn()
    @Field(() => NovelIndexEntity)
    novelIndex: NovelIndexEntity;
}
