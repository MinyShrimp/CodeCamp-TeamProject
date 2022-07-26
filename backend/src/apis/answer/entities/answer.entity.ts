import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

import { UserEntity } from 'src/apis/user/entities/user.entity';
import { QuestionEntity } from 'src/apis/question/entities/question.entity';

import {
    Entity,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* Answer Entity */
@Entity({ name: 'answer' })
@ObjectType({ description: '답변 Entity' })
export class AnswerEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column()
    @Field(() => String, { description: '제목' })
    title: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: '내용' })
    contents: string;

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @UpdateDateColumn()
    @Field(() => Date, { description: '수정 시간' })
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToOne(
        () => QuestionEntity, //
        (question) => question.answer,
    )
    @JoinColumn()
    @Field(() => QuestionEntity, { nullable: true })
    question: QuestionEntity;

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity, { nullable: true })
    user: UserEntity;
}
