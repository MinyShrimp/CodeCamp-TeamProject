import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NovelEntity } from 'src/apis/novel/entities/novel.entity';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import {
    Entity,
    ManyToOne,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* NovelDonate Entity */
@Entity({ name: 'novel_donate' })
@ObjectType({ description: '후원작 Entity' })
export class NovelDonateEntity {
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

    @ManyToOne(
        () => NovelEntity, //
        { cascade: true, onDelete: 'CASCADE' },
    )
    @Field(() => NovelEntity)
    novel: NovelEntity;
}
