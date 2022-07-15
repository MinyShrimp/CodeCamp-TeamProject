import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { NovelIndexEntity } from '../entities/novelIndex.entity';

@InputType()
export class UpdateNovelIndexInput extends PartialType(
    PickType(
        NovelIndexEntity,
        ['id', 'title', 'contents', 'authorText'],
        InputType,
    ),
) {
    @Field(() => Boolean, { description: '공지 여부', defaultValue: false })
    isNotice?: boolean;

    @Field(() => Boolean, { description: '완결 여부', defaultValue: false })
    isFinish?: boolean;
}
