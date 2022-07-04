// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { NameOutput } from 'src/commons/dto/name.admin.output';

import { CreateNovelAdminInput } from './dto/createNovel.admin.input';
import { UpdateNovelAdminInput } from './dto/updateNovel.admin.input';

import { NovelEntity } from './entities/novel.entity';
import { NovelAdminRepository } from './entities/novel.admin.repository';

@Controller('admin/novel')
export class NovelAdminController {
    constructor(
        private readonly novelAdminRepository: NovelAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelEntity[]> {
        return this.novelAdminRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<NameOutput>> {
        const results = await this.novelAdminRepository.findAllNames();
        return results.map((r) => {
            return { id: r.id, name: r.title };
        });
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelEntity> {
        return this.novelAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateNovelAdminInput, //
    ): Promise<NovelEntity> {
        return this.novelAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateNovelAdminInput, //
    ): Promise<boolean> {
        const result = await this.novelAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
