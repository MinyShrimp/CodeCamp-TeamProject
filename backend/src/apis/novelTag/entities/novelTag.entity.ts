import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NovelEntity } from 'src/apis/novel/entities/novel.entity';
import {
    Entity,
    Column,
    ManyToMany,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* NovelTag Entity */
@Entity({ name: 'novel_tag' })
@ObjectType({ description: 'NovelTag Entity' })
export class NovelTagEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column({ unique: true })
    @Field(() => String, { description: '이름' })
    name: string;

    @CreateDateColumn()
    createAt: Date;

    @ManyToMany(
        () => NovelEntity, //
        (novel) => novel.novelTags,
    )
    @Field(() => [NovelEntity])
    novels: NovelEntity[];
}
