import { Field, ObjectType } from '@nestjs/graphql';

import { EmailOutput } from 'src/apis/email/dto/email.output';
import { PhoneOutput } from 'src/apis/phone/dto/phone.output';
import { UserClassOutput } from 'src/apis/userClass/dto/userClass.output';
import { UserLikeOutput } from 'src/apis/userLike/dto/userLike.output';
import { UserBlockOutput } from 'src/apis/userBlock/dto/userBlock.output';
import { BoardOutput } from 'src/apis/board/dto/board.output';
import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

@ObjectType({ description: '회원 조회용 Output Class' })
export class UserOutput extends PickType(UserEntity, [
    'id',
    'name',
    'nickName',
    'email',
    'phone',
    'point',
]) {
    @Field(() => UserClassOutput, { description: '회원 등급' })
    userClass: UserClassOutput;

    @Field(() => PhoneOutput, { description: '핸드폰 인증' })
    authPhone: PhoneOutput;

    @Field(() => EmailOutput, { description: '이메일 인증' })
    authEmail: EmailOutput;

    @Field(() => [UserLikeOutput], { description: '선호 작가 목록' })
    userLikes: Array<UserLikeOutput>;

    @Field(() => [UserBlockOutput], { description: '차단 회원 목록' })
    userBlocks: Array<UserBlockOutput>;

    @Field(() => [BoardOutput], { description: '작성한 게시글 목록' })
    boards: Array<BoardOutput>;
}
