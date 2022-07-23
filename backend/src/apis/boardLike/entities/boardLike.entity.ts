import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BoardEntity } from 'src/apis/board/entities/board.entity';
import { UserEntity } from 'src/apis/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* BoardLike Entity */
@Entity({ name: 'board_like' })
@ObjectType({ description: 'BoardLike Entity' })
export class BoardLikeEntity {
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
        () => BoardEntity, //
        { cascade: true, onDelete: 'CASCADE' },
    )
    @Field(() => BoardEntity)
    board: BoardEntity;

    @Column({ name: 'boardId', nullable: true })
    boardID: string;
}
