import { Field, InputType, PickType } from '@nestjs/graphql';
import { NovelEntity } from '../entities/novel.entity';

@InputType()
export class CreateNovelInput extends PickType(
    NovelEntity,
    ['title', 'subtitle', 'description'],
    InputType,
) {
    @Field(() => [String], {
        description: `태그 목록. ex. ['#태그 1', '#태그 2']`,
    })
    tags: Array<string>;

    @Field(() => String, { description: `소설 카테고리 ID. (UUID)` })
    categoryID: string;
}
