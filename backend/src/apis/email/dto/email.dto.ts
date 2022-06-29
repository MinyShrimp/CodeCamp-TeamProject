import { ObjectType, PickType } from '@nestjs/graphql';
import { EmailEntity } from '../entities/email.entity';

@ObjectType()
export class EmailDto extends PickType(
    EmailEntity, //
    ['email', 'token'],
) {}
