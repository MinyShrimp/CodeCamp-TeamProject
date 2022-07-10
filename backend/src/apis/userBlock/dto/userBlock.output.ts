import { Field, ObjectType, PickType } from '@nestjs/graphql';

import { ToUserOutput } from 'src/apis/user/dto/toUser.output';
import { UserBlockEntity } from '../entities/userBlock.entity';

@ObjectType({ description: '회원 조회용 Output Class' })
export class UserBlockOutput extends PickType(UserBlockEntity, ['createAt']) {
    @Field(() => ToUserOutput, { description: '대상 회원 정보' })
    to: ToUserOutput;
}
