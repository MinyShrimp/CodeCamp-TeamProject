import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { EmailOutput } from 'src/apis/email/dto/email.output';
import { PhoneOutput } from 'src/apis/phone/dto/phone.output';
import { UserClassOutput } from 'src/apis/userClass/dto/userClass.output';

@ObjectType({ description: '회원 생성용 Output Class' })
export class CreateUserOutput {
    @Field(() => ID, { description: '회원 UUID' })
    id: string;

    @Field(() => String, { description: '이름' })
    name: string;

    @Field(() => String, { description: '닉네임' })
    nickName: string;

    @Field(() => String, { description: '이메일' })
    email: string;

    @Field(() => String, { description: '핸드폰 번호' })
    phone: string;

    @Field(() => Int, { description: '소지 금액' })
    point: number;

    @Field(() => UserClassOutput, { description: '회원 등급' })
    userClass: UserClassOutput;

    @Field(() => PhoneOutput, { description: '핸드폰 인증' })
    authPhone: PhoneOutput;

    @Field(() => EmailOutput, { description: '이메일 인증' })
    authEmail: EmailOutput;
}
