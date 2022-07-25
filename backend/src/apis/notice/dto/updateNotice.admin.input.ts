import { CreateNoticeAdminInput } from './createNotice.admin.input';

export interface UpdateNoticeAdminInput
    extends Partial<CreateNoticeAdminInput> {
    originID: string;
}
