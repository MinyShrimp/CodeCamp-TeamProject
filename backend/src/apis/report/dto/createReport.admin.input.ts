import { ReportEntity } from '../entities/report.entity';
export interface CreateReportAdminInput extends Omit<ReportEntity, 'id'> {}
