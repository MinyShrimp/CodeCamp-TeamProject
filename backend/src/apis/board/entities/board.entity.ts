import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* Board Entity */
@Entity({ name: 'board' })
@ObjectType({ description: 'Board Entity' })
export class BoardEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String)
    title: string;

    @Column({ type: 'text' })
    @Field(() => String)
    contents: string;

    @Column()
    @Field(() => Int)
    likeCount: number;

    @Column()
    @Field(() => Int)
    dislikeCount: number;

    @CreateDateColumn()
    createAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne(() => UserEntity, { cascade: true, onDelete: 'SET NULL' })
    @JoinColumn()
    @Field(() => UserEntity)
    userID: string;
}
