import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BoardEntity } from 'src/apis/board/entities/board.entity';
import { NovelEntity } from 'src/apis/novel/entities/novel.entity';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* FileUpload Entity */
@Entity({ name: 'upload_file' })
@ObjectType({ description: 'FileUpload Entity' })
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String, { description: '이름' })
    name: string;

    @Column()
    @Field(() => String, { description: '폴더' })
    path: string;

    @Column({ unique: true })
    @Field(() => String, { description: 'URL' })
    url: string;

    @ManyToOne(
        () => NovelEntity,
        { cascade: true, onDelete: 'SET NULL' }, //
    )
    @JoinColumn()
    novel: NovelEntity;

    @ManyToOne(
        () => BoardEntity, //
        { cascade: true, onDelete: 'SET NULL' },
    )
    @JoinColumn()
    board: BoardEntity;

    @CreateDateColumn()
    createAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}
