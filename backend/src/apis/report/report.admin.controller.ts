// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReportEntity } from './entities/report.entity';
import { ReportAdminRepository } from './entities/report.admin.repository';

@ApiTags('관리자/신고')
@Controller('api/admin/report')
export class ReportAdminController {
    constructor(
        private readonly reportAdminRepository: ReportAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<ReportEntity[]> {
        return this.reportAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<ReportEntity> {
        return this.reportAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.reportAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
