import { ObjectType, PickType } from '@nestjs/graphql';
import { EmailEntity } from '../entities/email.entity';

@ObjectType({ description: '회원 조회용 Output Class' })
export class EmailOutput extends PickType(EmailEntity, [
    'isAuth',
    'updateAt',
]) {}
