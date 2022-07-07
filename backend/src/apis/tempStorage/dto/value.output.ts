import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TempStorageOutput {
    @Field(() => String, { description: '제목' })
    title: string;

    @Field(() => String, { description: '내용' })
    contents: string;

    @Field(() => [String], { description: '태그' })
    tags: string[];
}
