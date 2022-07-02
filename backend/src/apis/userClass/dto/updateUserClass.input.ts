import { UserClassEntity } from '../entities/userClass.entity';

export interface UpdateUserClassInput extends Partial<UserClassEntity> {
    originID: string;
}
