import { registerEnumType } from '@nestjs/graphql';

export const FetchNovelIsFinish = {
    ALL: 'ALL',
    TRUE: 'TRUE',
    FALSE: 'FALSE',
};
export type FetchNovelIsFinish =
    typeof FetchNovelIsFinish[keyof typeof FetchNovelIsFinish];

registerEnumType(FetchNovelIsFinish, {
    name: 'FetchNovelIsFinish',
    description: '소설 조회 완결 여부',
});
