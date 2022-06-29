import { InputType, PickType } from '@nestjs/graphql';
import { PhoneEntity } from '../entities/phone.entity';

@InputType()
export class PhoneInput extends PickType(
    PhoneEntity,
    ['phone', 'token'],
    InputType,
) {}
