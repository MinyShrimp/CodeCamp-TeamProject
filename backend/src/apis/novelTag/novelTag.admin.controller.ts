// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { NameOutput } from 'src/commons/dto/name.admin.output';

import { CreateNovelTagAdminInput } from './dto/createNovelTag.admin.input';
import { UpdateNovelTagAdminInput } from './dto/updateNovelTag.admin.input';

import { NovelTagEntity } from './entities/novelTag.entity';
import { NovelTagAdminRepository } from './entities/novelTag.admin.repository';

@Controller('admin/novel-tag')
export class NovelTagAdminController {
    constructor(
        private readonly novelTagAdminRepository: NovelTagAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelTagEntity[]> {
        return this.novelTagAdminRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<NameOutput>> {
        const results = await this.novelTagAdminRepository.findAllNames();
        return results.map((r) => {
            return { id: r.id, name: r.name };
        });
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelTagEntity> {
        return this.novelTagAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateNovelTagAdminInput, //
    ): Promise<NovelTagEntity> {
        return this.novelTagAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateNovelTagAdminInput, //
    ): Promise<boolean> {
        const result = await this.novelTagAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelTagAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
