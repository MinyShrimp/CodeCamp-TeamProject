import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';

import { FileEntity } from 'src/apis/file/entities/file.entity';
import { UserEntity } from 'src/apis/user/entities/user.entity';

/* Event Entity */
@Entity({ name: 'event' })
@ObjectType({ description: 'Event Entity' })
export class EventEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column()
    @Field(() => String, { description: '제목' })
    title: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: '내용' })
    contents: string;

    @Column()
    @Field(() => Boolean, { description: '이벤트 진행 여부' })
    isEvent: boolean;

    @Column({ nullable: true })
    @Field(() => Date, { description: '이벤트 시작 시간', nullable: true })
    startAt?: Date;

    @Column({ nullable: true })
    @Field(() => Date, { description: '이벤트 종료 시간', nullable: true })
    endAt?: Date;

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @UpdateDateColumn()
    @Field(() => Date, { description: '수정 시간' })
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToMany(
        () => FileEntity, //
        (file) => file.event,
    )
    @Field(() => [FileEntity], { nullable: true })
    files: FileEntity[];

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity)
    user: UserEntity;
}
