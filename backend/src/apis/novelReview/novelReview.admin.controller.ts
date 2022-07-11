// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NovelReviewEntity } from './entities/novelReview.entity';
import { NovelReviewAdminRepository } from './entities/novelReview.admin.repository';

@ApiTags('관리자/소설/리뷰')
@Controller('admin/novel-review')
export class NovelReviewAdminController {
    constructor(
        private readonly novelReviewAdminRepository: NovelReviewAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelReviewEntity[]> {
        return this.novelReviewAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelReviewEntity> {
        return this.novelReviewAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelReviewAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
