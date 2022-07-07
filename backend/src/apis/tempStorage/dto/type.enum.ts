import { registerEnumType } from '@nestjs/graphql';

export const TEMP_TYPE = {
    NOVEL: 'NOVEL',
    BOARD: 'BOARD',
} as const;
export type TEMP_TYPE = typeof TEMP_TYPE[keyof typeof TEMP_TYPE];

registerEnumType(TEMP_TYPE, {
    name: 'TEMP_TYPE',
    description: '임시 저장 타입 ENUM',
});
