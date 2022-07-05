// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';

import { NovelIndexReviewEntity } from './entities/novelIndexReview.entity';
import { NovelIndexReviewAdminRepository } from './entities/novelIndexReview.admin.repository';

@Controller('admin/novel-index-review')
export class NovelIndexReviewAdminController {
    constructor(
        private readonly novelIndexReviewAdminRepository: NovelIndexReviewAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelIndexReviewEntity[]> {
        return this.novelIndexReviewAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelIndexReviewEntity> {
        return this.novelIndexReviewAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelIndexReviewAdminRepository.bulkDelete(
            IDs,
        );
        return results.map((r) => (r.affected ? true : false));
    }
}
