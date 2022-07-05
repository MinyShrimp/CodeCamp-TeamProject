import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToOne,
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

    @Column()
    @Field(() => String, { description: 'URL' })
    url: string;

    @CreateDateColumn()
    createAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}
