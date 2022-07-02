import { UserEntity } from '../entities/user.entity';

export interface UpdateUserAdminInput
    extends Partial<
        Pick<UserEntity, 'name' | 'email' | 'point' | 'isLogin' | 'userClass'>
    > {
    originID: string;
}
