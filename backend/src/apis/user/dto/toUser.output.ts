import { ObjectType, PickType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';

@ObjectType({ description: '회원 조회용 Output Class' })
export class ToUserOutput extends PickType(UserEntity, [
    'id',
    'nickName',
    'email',
]) {}
