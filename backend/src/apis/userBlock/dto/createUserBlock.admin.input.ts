import { UserBlockEntity } from '../entities/userBlock.entity';
export interface CreateUserBlockAdminInput extends Omit<UserBlockEntity, 'id'> {}
