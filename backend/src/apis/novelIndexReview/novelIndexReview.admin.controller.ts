// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateNovelIndexReviewAdminInput } from './dto/createNovelIndexReview.admin.input';
import { UpdateNovelIndexReviewAdminInput } from './dto/updateNovelIndexReview.admin.input';

import { NovelIndexReviewEntity } from './entities/novelIndexReview.entity';
import { NovelIndexReviewAdminRepository } from './entities/novelIndexReview.admin.repository';

@Controller('admin/novelIndexReview')
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

    @Post('/')
    create(
        @Body() input: CreateNovelIndexReviewAdminInput, //
    ): Promise<NovelIndexReviewEntity> {
        return this.novelIndexReviewAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateNovelIndexReviewAdminInput, //
    ): Promise<boolean> {
        const result = await this.novelIndexReviewAdminRepository.update(input);
        return result.affected ? true : false;
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
