import { CreateReportInput } from './createReport.input';

export interface createReportDto extends CreateReportInput {
    userID: string;
}
