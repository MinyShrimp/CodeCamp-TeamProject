import { registerEnumType } from '@nestjs/graphql';

export const FetchNovelType = {
    ALL: 'ALL',
    CATEGORY: 'CATEGORY',
    CYCLE: 'CYCLE',
};
export type FetchNovelType = typeof FetchNovelType[keyof typeof FetchNovelType];

registerEnumType(FetchNovelType, {
    name: 'FetchNovelType',
    description: '소설 조회 Type',
});
