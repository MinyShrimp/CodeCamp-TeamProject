import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { QuestionEntity } from 'src/apis/question/entities/question.entity';
import {
    Entity,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';

/* Answer Entity */
@Entity({ name: 'answer' })
@ObjectType({ description: '답변 Entity' })
export class AnswerEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: '내용' })
    contents: string;

    @Min(0)
    @Max(5)
    @Column({ type: 'decimal', precision: 2, scale: 1 })
    @Field(() => Float, { description: '내용' })
    star: number;

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
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => QuestionEntity, { nullable: true })
    question: QuestionEntity;
}
