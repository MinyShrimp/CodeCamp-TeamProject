import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export const SearchNovelType = {
    TITLE: 'TITLE',
    NICKNAME: 'NICKNAME',
};
export type SearchNovelType =
    typeof SearchNovelType[keyof typeof SearchNovelType];

registerEnumType(SearchNovelType, {
    name: 'SearchNovelType',
    description: '소설 검색 type',
});

@InputType()
export class SearchNovelInput {
    @Field(() => SearchNovelType, { defaultValue: SearchNovelType.TITLE })
    type: SearchNovelType;

    @Field(() => String)
    keyword: string;
}
