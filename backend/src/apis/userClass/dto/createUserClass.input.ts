import { InputType, PickType } from '@nestjs/graphql';
import { UserClassEntity } from '../entities/userClass.entity';

@InputType()
export class CreateUserClassInput extends PickType(
    UserClassEntity,
    ['id', 'description'],
    InputType,
) {}
