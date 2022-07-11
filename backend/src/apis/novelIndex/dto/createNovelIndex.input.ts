import { Field, InputType, PickType } from '@nestjs/graphql';
import { NovelIndexEntity } from '../entities/novelIndex.entity';

@InputType()
export class CreateNovelIndexInput extends PickType(
    NovelIndexEntity,
    ['title', 'contents'],
    InputType,
) {
    @Field(() => String, { description: '소설 UUID' })
    novelID: string;
}
