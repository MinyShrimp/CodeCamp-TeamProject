import { Field, InputType, PickType } from '@nestjs/graphql';
import { NovelIndexEntity } from '../entities/novelIndex.entity';

@InputType()
export class CreateNovelIndexInput extends PickType(
    NovelIndexEntity,
    ['title', 'contents', 'authorText'],
    InputType,
) {
    @Field(() => Boolean, { description: '공지 여부', defaultValue: false })
    isNotice?: boolean;

    @Field(() => Boolean, { description: '완결 여부', defaultValue: false })
    isFinish?: boolean;

    @Field(() => String, { description: '소설 UUID' })
    novelID: string;
}
