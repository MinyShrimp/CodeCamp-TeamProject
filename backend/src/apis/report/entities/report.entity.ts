import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ReportEnumEntity } from 'src/apis/reportEnum/entities/reportEnum.entity';
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

/* Report Entity */
@Entity({ name: 'report' })
@ObjectType({ description: 'Report Entity' })
export class ReportEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String)
    title: string;

    @Column()
    @Field(() => String)
    contents: string;

    @Column()
    @Field(() => String)
    reportUUID: string;

    @CreateDateColumn()
    @Field(() => Date)
    createAt: Date;

    @UpdateDateColumn()
    @Field(() => Date)
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne(
        () => ReportEnumEntity, //
        { onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => ReportEnumEntity)
    enum: ReportEnumEntity;

    @ManyToOne(
        () => UserEntity, //
        { onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity)
    user: UserEntity;
}
