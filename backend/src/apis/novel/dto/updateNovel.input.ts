import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateNovelInput } from './createNovel.input';

@InputType()
export class UpdateNovelInput extends PartialType(CreateNovelInput) {
    @Field(() => String, { description: 'UUID' })
    id: string;
}
