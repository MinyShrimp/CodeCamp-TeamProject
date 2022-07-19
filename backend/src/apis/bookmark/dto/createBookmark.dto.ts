import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookmarkDto {
    @Field(() => String)
    novelIndexID?: string;

    @Field(() => Number)
    page: number;

    @Field(() => String, { nullable: true })
    bookmarkID?: string;

    @Field(() => Boolean, { nullable: true, defaultValue: true })
    isBoolean?: boolean;
}
