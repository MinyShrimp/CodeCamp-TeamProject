import { Field, InputType, PickType } from '@nestjs/graphql';
import { UserEntity } from '../../user/entities/user.entity';

@InputType()
export class LoginInput extends PickType(
    UserEntity, //
    ['email'],
    InputType,
) {
    @Field(() => String, { description: '비밀번호' })
    pwd: string;
}
