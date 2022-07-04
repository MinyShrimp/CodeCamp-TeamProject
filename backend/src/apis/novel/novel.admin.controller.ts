// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';

import { NameOutput } from 'src/commons/dto/name.admin.output';

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

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelEntity> {
        return this.novelAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
