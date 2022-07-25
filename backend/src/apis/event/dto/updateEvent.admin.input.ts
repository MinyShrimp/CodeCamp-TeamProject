import { CreateEventAdminInput } from './createEvent.admin.input';

export interface UpdateEventAdminInput extends Partial<CreateEventAdminInput> {
    originID: string;
}
