// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CommentEntity } from './entities/comment.entity';
import { CommentAdminRepository } from './entities/comment.admin.repository';

@ApiTags('관리자/게시판/댓글')
@Controller('admin/comment')
export class CommentAdminController {
    constructor(
        private readonly commentAdminRepository: CommentAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<CommentEntity[]> {
        return this.commentAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<CommentEntity> {
        return this.commentAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.commentAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
