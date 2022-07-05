// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateReportEnumAdminInput } from './dto/createReportEnum.admin.input';
import { UpdateReportEnumAdminInput } from './dto/updateReportEnum.admin.input';

import { ReportEnumEntity } from './entities/reportEnum.entity';
import { ReportEnumAdminRepository } from './entities/reportEnum.admin.repository';

@Controller('admin/report-enum')
export class ReportEnumAdminController {
    constructor(
        private readonly reportEnumAdminRepository: ReportEnumAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<ReportEnumEntity[]> {
        return this.reportEnumAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<ReportEnumEntity> {
        return this.reportEnumAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateReportEnumAdminInput, //
    ): Promise<ReportEnumEntity> {
        return this.reportEnumAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateReportEnumAdminInput, //
    ): Promise<boolean> {
        const result = await this.reportEnumAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.reportEnumAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
