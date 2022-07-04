// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { NameOutput } from 'src/commons/dto/name.admin.output';

import { CreateNovelIndexAdminInput } from './dto/createNovelIndex.admin.input';
import { UpdateNovelIndexAdminInput } from './dto/updateNovelIndex.admin.input';

import { NovelIndexEntity } from './entities/novelIndex.entity';
import { NovelIndexAdminRepository } from './entities/novelIndex.admin.repository';

@Controller('admin/novelIndex')
export class NovelIndexAdminController {
    constructor(
        private readonly novelIndexAdminRepository: NovelIndexAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelIndexEntity[]> {
        return this.novelIndexAdminRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<NameOutput>> {
        const results = await this.novelIndexAdminRepository.findAllNames();
        return results.map((r) => {
            return { id: r.id, name: r.title };
        });
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelIndexEntity> {
        return this.novelIndexAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateNovelIndexAdminInput, //
    ): Promise<NovelIndexEntity> {
        return this.novelIndexAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateNovelIndexAdminInput, //
    ): Promise<boolean> {
        const result = await this.novelIndexAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelIndexAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
