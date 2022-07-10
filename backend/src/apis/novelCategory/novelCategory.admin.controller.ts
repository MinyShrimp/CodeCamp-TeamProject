// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NameOutput } from 'src/commons/dto/name.admin.output';

import { CreateNovelCategoryAdminInput } from './dto/createNovelCategory.admin.input';
import { UpdateNovelCategoryAdminInput } from './dto/updateNovelCategory.admin.input';

import { NovelCategoryEntity } from './entities/novelCategory.entity';
import { NovelCategoryAdminRepository } from './entities/novelCategory.admin.repository';

@ApiTags('관리자/소설/카테고리')
@Controller('admin/novel-category')
export class NovelCategoryAdminController {
    constructor(
        private readonly novelCategoryRepository: NovelCategoryAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelCategoryEntity[]> {
        return this.novelCategoryRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<NameOutput>> {
        const results = await this.novelCategoryRepository.findAllNames();
        return results.map((r) => {
            return { id: r.id, name: r.name };
        });
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelCategoryEntity> {
        return this.novelCategoryRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateNovelCategoryAdminInput, //
    ): Promise<NovelCategoryEntity> {
        return this.novelCategoryRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateNovelCategoryAdminInput, //
    ): Promise<boolean> {
        const result = await this.novelCategoryRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelCategoryRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
