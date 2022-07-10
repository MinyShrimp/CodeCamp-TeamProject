// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NovelTagEntity } from './entities/novelTag.entity';
import { NovelTagAdminRepository } from './entities/novelTag.admin.repository';

@ApiTags('관리자/소설/태그')
@Controller('admin/novel-tag')
export class NovelTagAdminController {
    constructor(
        private readonly novelTagAdminRepository: NovelTagAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelTagEntity[]> {
        return this.novelTagAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelTagEntity> {
        return this.novelTagAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelTagAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
