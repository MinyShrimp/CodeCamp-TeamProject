import { Field, InputType, PickType } from '@nestjs/graphql';
import { NovelEntity } from '../entities/novel.entity';
import { CYCLE_TYPE } from '../enum/cycle.type';

@InputType()
export class CreateNovelInput extends PickType(
    NovelEntity,
    ['title', 'description'],
    InputType,
) {
    @Field(() => [String], {
        description: `태그 목록. ex. ['#태그 1', '#태그 2']`,
    })
    tags: Array<string>;

    @Field(() => String, { description: `소설 카테고리 ID. (UUID)` })
    categoryID: string;

    @Field(() => [CYCLE_TYPE], {
        description: `연재 주기. ex. [MON, THU, WED, ...] or [FREE]`,
    })
    cycles: Array<CYCLE_TYPE>;

    @Field(() => [String], { description: '파일 URLs' })
    fileURLs: Array<string>;
}
