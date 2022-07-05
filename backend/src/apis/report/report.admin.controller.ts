// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { NameOutput } from 'src/commons/dto/name.admin.output';

import { CreateReportAdminInput } from './dto/createReport.admin.input';
import { UpdateReportAdminInput } from './dto/updateReport.admin.input';

import { ReportEntity } from './entities/report.entity';
import { ReportAdminRepository } from './entities/report.admin.repository';

@Controller('admin/report')
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

    @Post('/')
    create(
        @Body() input: CreateReportAdminInput, //
    ): Promise<ReportEntity> {
        return this.reportAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateReportAdminInput, //
    ): Promise<boolean> {
        const result = await this.reportAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.reportAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
