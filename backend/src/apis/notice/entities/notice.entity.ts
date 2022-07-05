import { Field, ID, ObjectType } from '@nestjs/graphql';
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
} from 'typeorm';

/* Notice Entity */
@Entity({ name: 'notice' })
@ObjectType({ description: '공지 Entity' })
export class NoticeEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
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
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @UpdateDateColumn()
    @Field(() => Date, { description: '수정 시간' })
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne(
        () => UserEntity,
        { cascade: true, onDelete: 'SET NULL' }, //
    )
    @JoinColumn()
    @Field(() => UserEntity, { nullable: true })
    user: UserEntity;
}
