// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NameOutput } from '../../commons/dto/name.admin.output';

import { QuestionEntity } from './entities/question.entity';
import { QuestionAdminRepository } from './entities/question.admin.repository';

@ApiTags('관리자/문의')
@Controller('admin/question')
export class QuestionAdminController {
    constructor(
        private readonly questionAdminRepository: QuestionAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<QuestionEntity[]> {
        return this.questionAdminRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<NameOutput>> {
        const results = await this.questionAdminRepository.findAllNames();
        return results.map((r) => {
            return { id: r.id, name: r.title };
        });
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<QuestionEntity> {
        return this.questionAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.questionAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
