import { UserLikeEntity } from '../entities/userLike.entity';
export interface CreateUserLikeAdminInput extends Omit<UserLikeEntity, 'id'> {}
