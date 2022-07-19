import { registerEnumType } from '@nestjs/graphql';

export const FetchNovelOrder = {
    LAST: 'LAST',
    LIKE: 'LIKE',
};
export type FetchNovelOrder =
    typeof FetchNovelOrder[keyof typeof FetchNovelOrder];

registerEnumType(FetchNovelOrder, {
    name: 'FetchNovelOrder',
    description: '소설 조회 Order',
});
