import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

/* ReportEnum Entity */
@Entity({ name: 'reportEnum' })
@ObjectType({ description: '신고 Enum Entity' })
export class ReportEnumEntity {
    @PrimaryColumn()
    @Field(() => ID, { description: 'ID' })
    id: string;

    @Column()
    @Field(() => String, { description: '테이블 이름' })
    table: string;

    @Column()
    @Field(() => String, { description: '설명' })
    description: string;
}
