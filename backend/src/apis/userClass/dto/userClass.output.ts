import { PickType, ObjectType } from '@nestjs/graphql';
import { UserClassEntity } from '../entities/userClass.entity';

@ObjectType({ description: '회원 조회용 Output Class' })
export class UserClassOutput extends PickType(UserClassEntity, ['id']) {}
