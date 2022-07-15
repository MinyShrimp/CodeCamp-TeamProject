import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NovelEntity } from '../entities/novel.entity';

@ObjectType()
export class FetchNovelsOutput {
    @Field(() => [NovelEntity], { description: '소설 조회' })
    novels: Array<NovelEntity>;

    @Field(() => Int, { description: '전체 갯수' })
    count: number;
}
