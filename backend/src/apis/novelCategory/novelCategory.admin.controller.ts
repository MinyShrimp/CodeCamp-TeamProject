// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { NameOutput } from 'src/commons/dto/name.admin.output';

import { CreateNovelCategoryAdminInput } from './dto/createNovelCategory.admin.input';
import { UpdateNovelCategoryAdminInput } from './dto/updateNovelCategory.admin.input';

import { NovelCategoryEntity } from './entities/novelCategory.entity';
import { NovelCategoryAdminRepository } from './entities/novelCategory.admin.repository';

@Controller('admin/novel-category')
export class NovelCategoryAdminController {
    constructor(
        private readonly novelCategoryAdminRepository: NovelCategoryAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelCategoryEntity[]> {
        return this.novelCategoryAdminRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<NameOutput>> {
        const results = await this.novelCategoryAdminRepository.findAllNames();
        return results.map((r) => {
            return { id: r.id, name: r.name };
        });
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelCategoryEntity> {
        return this.novelCategoryAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateNovelCategoryAdminInput, //
    ): Promise<NovelCategoryEntity> {
        return this.novelCategoryAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateNovelCategoryAdminInput, //
    ): Promise<boolean> {
        const result = await this.novelCategoryAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelCategoryAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
