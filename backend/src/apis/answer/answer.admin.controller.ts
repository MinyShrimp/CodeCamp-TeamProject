// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateAnswerAdminInput } from './dto/createAnswer.admin.input';
import { UpdateAnswerAdminInput } from './dto/updateAnswer.admin.input';

import { AnswerEntity } from './entities/answer.entity';
import { AnswerAdminRepository } from './entities/answer.admin.repository';

@Controller('admin/answer')
export class AnswerAdminController {
    constructor(
        private readonly answerAdminRepository: AnswerAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<AnswerEntity[]> {
        return this.answerAdminRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<string>> {
        const results = await this.answerAdminRepository.findAllNames();
        return results.map((r) => r.id);
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<AnswerEntity> {
        return this.answerAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateAnswerAdminInput, //
    ): Promise<AnswerEntity> {
        return this.answerAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateAnswerAdminInput, //
    ): Promise<boolean> {
        const result = await this.answerAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.answerAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
