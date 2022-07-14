import { registerEnumType } from '@nestjs/graphql';

export const REPORT_TYPE = {
    BOARD: 'BOARD',
    COMMENT: 'COMMENT',
    NOVEL: 'NOVEL',
    NOVELREVIEW: 'NOVELREVIEW',
    NOVELINDEX: 'NOVELINDEX',
    NOVELINDEXREVIEW: 'NOVELINDEXREVIEW',
    USER: 'USER',
};
export type REPORT_TYPE = typeof REPORT_TYPE[keyof typeof REPORT_TYPE];

registerEnumType(REPORT_TYPE, {
    name: 'REPORT_TYPE',
    description: '신고 Type',
});
