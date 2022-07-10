// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateNovelLikeAdminInput } from './dto/createNovelLike.admin.input';
import { UpdateNovelLikeAdminInput } from './dto/updateNovelLike.admin.input';

import { NovelLikeEntity } from './entities/novelLike.entity';
import { NovelLikeAdminRepository } from './entities/novelLike.admin.repository';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('관리자/회원/선호작')
@Controller('admin/novel-like')
export class NovelLikeAdminController {
    constructor(
        private readonly novelLikeAdminRepository: NovelLikeAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelLikeEntity[]> {
        return this.novelLikeAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelLikeEntity> {
        return this.novelLikeAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateNovelLikeAdminInput, //
    ): Promise<NovelLikeEntity> {
        return this.novelLikeAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateNovelLikeAdminInput, //
    ): Promise<boolean> {
        const result = await this.novelLikeAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelLikeAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
