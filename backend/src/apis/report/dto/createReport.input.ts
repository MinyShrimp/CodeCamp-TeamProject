import { Field, InputType, PickType } from '@nestjs/graphql';
import { REPORT_TYPE } from 'src/apis/reportEnum/interface/type.enum';
import { ReportEntity } from '../entities/report.entity';

@InputType()
export class CreateReportInput extends PickType(
    ReportEntity,
    ['title', 'contents', 'reportUUID'],
    InputType,
) {
    @Field(() => REPORT_TYPE, { description: '신고 ENUM' })
    type: REPORT_TYPE;
}
