import { CreateReportAdminInput } from './createReport.admin.input';
export interface UpdateReportAdminInput
    extends Partial<CreateReportAdminInput> {
    originID: string;
}
