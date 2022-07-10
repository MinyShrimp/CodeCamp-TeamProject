import { Field, ObjectType, PickType } from '@nestjs/graphql';

import { ToUserOutput } from 'src/apis/user/dto/toUser.output';
import { UserLikeEntity } from '../entities/userLike.entity';

@ObjectType({ description: '회원 조회용 Output Class' })
export class UserLikeOutput extends PickType(UserLikeEntity, ['createAt']) {
    @Field(() => ToUserOutput, { description: '대상 회원 정보' })
    to: ToUserOutput;
}
