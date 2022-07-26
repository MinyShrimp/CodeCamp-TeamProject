// prettier-ignore
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

import { AnswerEntity } from './entities/answer.entity';
import { AnswerAdminRepository } from './entities/answer.admin.repository';
import { UpdateAnswerAdminInput } from './dto/updateAnswer.admin.input';

@ApiTags('관리자/답변')
@Controller('api/admin/answer')
export class AnswerAdminController {
    constructor(
        private readonly answerAdminRepository: AnswerAdminRepository, //
    ) {}

    @ApiOperation({
        summary: '모든 답변 목록 API',
    })
    @Get('/all')
    findAll(): Promise<AnswerEntity[]> {
        return this.answerAdminRepository.findAll();
    }

    @ApiOperation({
        summary: '단일 답변 목록 API',
    })
    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<AnswerEntity> {
        return this.answerAdminRepository.findOne(id);
    }

    @ApiOperation({
        summary: '답변 수정 API',
    })
    @Patch('/')
    async update(
        @Body() input: UpdateAnswerAdminInput, //
    ): Promise<boolean> {
        const result = await this.answerAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @ApiOperation({
        summary: '답변 삭제 API',
    })
    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.answerAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
