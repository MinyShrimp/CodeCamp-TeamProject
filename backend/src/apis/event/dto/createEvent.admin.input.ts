import { EventEntity } from '../entities/event.entity';
export interface CreateEventAdminInput
    extends Pick<
        EventEntity,
        'title' | 'contents' | 'isEvent' | 'startAt' | 'endAt'
    > {}
