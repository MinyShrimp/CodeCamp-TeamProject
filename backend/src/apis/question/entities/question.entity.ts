import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AnswerEntity } from 'src/apis/answer/entities/answer.entity';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    OneToOne,
} from 'typeorm';

/* Question Entity */
@Entity({ name: 'question' })
@ObjectType({ description: '문의 Entity' })
export class QuestionEntity {
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

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity, { nullable: true })
    user: UserEntity;

    @OneToOne(
        () => AnswerEntity, //
        (answer) => answer.question,
    )
    @Field(() => AnswerEntity, { nullable: true })
    answer: AnswerEntity;

    @Column()
    @Field(() => Boolean, {
        description: '답변 등록 여부',
        defaultValue: false,
    })
    status: boolean;
}
