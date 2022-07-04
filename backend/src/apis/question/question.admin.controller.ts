// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateQuestionAdminInput } from './dto/createQuestion.admin.input';
import { UpdateQuestionAdminInput } from './dto/updateQuestion.admin.input';

import { QuestionEntity } from './entities/question.entity';
import { QuestionAdminRepository } from './entities/question.admin.repository';

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
    async findAllNames(): Promise<Array<string>> {
        const results = await this.questionAdminRepository.findAllNames();
        return results.map((r) => r.id);
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<QuestionEntity> {
        return this.questionAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateQuestionAdminInput, //
    ): Promise<QuestionEntity> {
        return this.questionAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateQuestionAdminInput, //
    ): Promise<boolean> {
        const result = await this.questionAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.questionAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
