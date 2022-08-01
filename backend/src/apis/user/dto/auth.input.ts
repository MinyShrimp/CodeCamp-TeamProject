import { InputType, PickType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class OAuthInput extends PickType(
    UserEntity,
    ['nickName', 'phone'],
    InputType,
) {}
