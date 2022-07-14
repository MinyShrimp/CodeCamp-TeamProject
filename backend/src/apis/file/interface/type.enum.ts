import { registerEnumType } from '@nestjs/graphql';

export const FILE_TYPE = {
    USER: 'USER',
    NOVEL: 'NOVEL',
};
export type FILE_TYPE = typeof FILE_TYPE[keyof typeof FILE_TYPE];

registerEnumType(FILE_TYPE, {
    name: 'FILE_TYPE',
    description: '파일 저장 위치',
});
