import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

const FetchNovelType = {
    ALL: 'ALL',
    CATEGORY: 'CATEGORY',
    CYCLE: 'CYCLE',
};
type FetchNovelType = typeof FetchNovelType[keyof typeof FetchNovelType];
registerEnumType(FetchNovelType, {
    name: 'FetchNovelType',
    description: '소설 조회 Type',
});

const FetchNovelOrder = {
    LAST: 'LAST',
    LIKE: 'LIKE',
};
type FetchNovelOrder = typeof FetchNovelOrder[keyof typeof FetchNovelOrder];
registerEnumType(FetchNovelOrder, {
    name: 'FetchNovelOrder',
    description: '소설 조회 Order',
});

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

    @Field(() => Boolean, { description: '완결 여부' })
    isFinish: boolean;

    @Field(() => Int, { description: '페이지', defaultValue: 1 })
    page: number;
}
