import { Field, InputType, PickType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(
    UserEntity,
    ['name', 'nickName', 'email', 'phone'],
    InputType,
) {
    @Field(() => String, { description: '비밀번호' })
    pwd: string;
}
