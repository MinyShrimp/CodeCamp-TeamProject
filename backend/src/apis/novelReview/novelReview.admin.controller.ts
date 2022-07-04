// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateNovelReviewAdminInput } from './dto/createNovelReview.admin.input';
import { UpdateNovelReviewAdminInput } from './dto/updateNovelReview.admin.input';

import { NovelReviewEntity } from './entities/novelReview.entity';
import { NovelReviewAdminRepository } from './entities/novelReview.admin.repository';

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

    @Post('/')
    create(
        @Body() input: CreateNovelReviewAdminInput, //
    ): Promise<NovelReviewEntity> {
        return this.novelReviewAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateNovelReviewAdminInput, //
    ): Promise<boolean> {
        const result = await this.novelReviewAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelReviewAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
