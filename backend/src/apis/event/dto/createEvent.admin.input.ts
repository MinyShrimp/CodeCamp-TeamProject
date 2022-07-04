import { EventEntity } from '../entities/event.entity';
export interface CreateEventAdminInput extends Omit<EventEntity, 'id'> {}
