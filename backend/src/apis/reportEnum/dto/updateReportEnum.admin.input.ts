import { CreateReportEnumAdminInput } from './createReportEnum.admin.input';
export interface UpdateReportEnumAdminInput
    extends Partial<CreateReportEnumAdminInput> {
    originID: string;
}
