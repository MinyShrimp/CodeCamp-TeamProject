import { ReportEnumEntity } from '../entities/reportEnum.entity';
export interface CreateReportEnumAdminInput
    extends Omit<ReportEnumEntity, 'table'> {}
