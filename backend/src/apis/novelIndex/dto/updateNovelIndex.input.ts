import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { NovelIndexEntity } from '../entities/novelIndex.entity';

@InputType()
export class UpdateNovelIndexInput extends PartialType(
    PickType(NovelIndexEntity, ['title', 'contents'], InputType),
) {
    @Field(() => String, { description: 'UUID' })
    id: string;
}
