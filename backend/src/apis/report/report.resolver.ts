import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { ReportEntity } from './entities/report.entity';
import { CreateReportInput } from './dto/createReport.input';

import { ReportService } from './report.service';

@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class ReportResolver {
    constructor(
        private readonly reportService: ReportService, //
    ) {}

    // 생성
    @Mutation(
        () => ReportEntity,
        { description: '신고 등록' }, //
    )
    createReport(
        @CurrentUser() payload: IPayload,
        @Args('createReportInput') input: CreateReportInput, //
    ): Promise<ReportEntity> {
        return this.reportService.create({
            userID: payload.id,
            ...input,
        });
    }

    // 삭제
    @Mutation(
        () => ResultMessage,
        { description: '신고 취소' }, //
    )
    async cancelReport(
        @CurrentUser() payload: IPayload,
        @Args('reportID') reportID: string, //
    ): Promise<ResultMessage> {
        const result = await this.reportService.cancel({
            userID: payload.id,
            reportID,
        });

        return new ResultMessage({
            isSuccess: result,
            contents: result ? '신고 취소 성공' : '신고 취소 실패',
        });
    }
}
