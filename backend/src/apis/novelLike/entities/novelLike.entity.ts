import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NovelEntity } from 'src/apis/novel/entities/novel.entity';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import {
    Entity,
    Column,
    ManyToOne,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* NovelLike Entity */
@Entity({ name: 'novel_like' })
@ObjectType({ description: '선호작 Entity' })
export class NovelLikeEntity {
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
        () => NovelEntity, //
        { cascade: true, onDelete: 'CASCADE' },
    )
    @Field(() => NovelEntity)
    novel: NovelEntity;

    @Column({ name: 'novelId', nullable: true })
    novelID: string;
}
