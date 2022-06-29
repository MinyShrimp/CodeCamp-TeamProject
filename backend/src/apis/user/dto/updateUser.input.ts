import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(
    PickType(UserEntity, ['name', 'email'], InputType),
) {}
