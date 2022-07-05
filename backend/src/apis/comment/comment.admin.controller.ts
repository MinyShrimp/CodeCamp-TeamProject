// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateCommentAdminInput } from './dto/createComment.admin.input';
import { UpdateCommentAdminInput } from './dto/updateComment.admin.input';

import { CommentEntity } from './entities/comment.entity';
import { CommentAdminRepository } from './entities/comment.admin.repository';

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

    @Post('/')
    create(
        @Body() input: CreateCommentAdminInput, //
    ): Promise<CommentEntity> {
        return this.commentAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateCommentAdminInput, //
    ): Promise<boolean> {
        const result = await this.commentAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.commentAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
