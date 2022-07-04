import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* Event Entity */
@Entity({ name: 'event' })
@ObjectType({ description: 'Event Entity' })
export class EventEntity {
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
    @Field(() => Boolean)
    isEvent: boolean;

    @Column()
    @Field(() => Date)
    startAt: Date;

    @Column()
    @Field(() => Date)
    endAt: Date;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(
        () => UserEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity)
    user: UserEntity;
}
