import { registerEnumType } from '@nestjs/graphql';

export const CYCLE_TYPE = {
    FREE: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
    SUN: 7,
};
export type CYCLE_TYPE = typeof CYCLE_TYPE[keyof typeof CYCLE_TYPE];

registerEnumType(CYCLE_TYPE, {
    name: 'CYCLE_TYPE',
    description: '연재 주기',
});
