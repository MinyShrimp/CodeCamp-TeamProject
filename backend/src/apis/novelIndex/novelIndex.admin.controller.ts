// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';

import { NovelIndexEntity } from './entities/novelIndex.entity';
import { NovelIndexAdminRepository } from './entities/novelIndex.admin.repository';

@Controller('admin/novel-index')
export class NovelIndexAdminController {
    constructor(
        private readonly novelIndexAdminRepository: NovelIndexAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelIndexEntity[]> {
        return this.novelIndexAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelIndexEntity> {
        return this.novelIndexAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelIndexAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
