import { CreateNovelDonateAdminInput } from './createNovelDonate.admin.input';
export interface UpdateNovelDonateAdminInput
    extends Partial<CreateNovelDonateAdminInput> {
    originID: string;
}
