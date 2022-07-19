import { Field, InputType, Int } from '@nestjs/graphql';
import { FetchNovelIsFinish } from '../enum/fetch.isFinish';
import { FetchNovelOrder } from '../enum/fetch.order';
import { FetchNovelType } from '../enum/fetch.type';

@InputType()
export class FetchNovelInput {
    @Field(() => FetchNovelType)
    type: FetchNovelType;

    @Field(() => String, {
        description: `ALL => '', CATEGORY => '카테고리 UUID', CYCLE => '0 ~ 7'`,
    })
    target: string;

    @Field(() => FetchNovelOrder)
    order: FetchNovelOrder;

    @Field(() => FetchNovelIsFinish)
    isFinish: FetchNovelIsFinish;

    @Field(() => Int, { description: '페이지', defaultValue: 1 })
    page: number;
}
