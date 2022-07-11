import { CLASSID } from 'src/apis/userClass/entities/userClass.repository';
import { UserEntity } from '../entities/user.entity';

export interface UpdateUserAdminInput
    extends Partial<Pick<UserEntity, 'name' | 'email' | 'point' | 'isLogin'>> {
    originID: string;
    userClassID: CLASSID;
}
