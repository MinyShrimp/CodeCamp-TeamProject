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
    @Field(() => ID, { description: 'UUID' })
    id: string;

    @Column()
    @Field(() => String, { description: '제목' })
    title: string;

    @Column()
    @Field(() => String, { description: '내용' })
    contents: string;

    @Column()
    @Field(() => String, { description: '신고 대상 UUID' })
    reportUUID: string;

    @CreateDateColumn()
    @Field(() => Date, { description: '생성 시간' })
    createAt: Date;

    @UpdateDateColumn()
    @Field(() => Date, { description: '수정 시간' })
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne(
        () => ReportEnumEntity, //
        { onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => ReportEnumEntity, { description: '신고 ENUM' })
    enum: ReportEnumEntity;

    @ManyToOne(
        () => UserEntity, //
        { onDelete: 'SET NULL' },
    )
    @JoinColumn()
    @Field(() => UserEntity, { description: '신고한 회원' })
    user: UserEntity;
}
