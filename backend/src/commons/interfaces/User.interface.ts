import { UserEntity } from 'src/apis/user/entities/user.entity';

export interface IUser extends Pick<UserEntity, 'email' | 'name'> {}
