import { ObjectType, PickType } from '@nestjs/graphql';
import { PhoneEntity } from '../entities/phone.entity';

@ObjectType({ description: '회원 조회용 Output Class' })
export class PhoneOutput extends PickType(PhoneEntity, [
    'isAuth',
    'updateAt',
]) {}
