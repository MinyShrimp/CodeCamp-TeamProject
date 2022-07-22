// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { NameOutput } from 'src/commons/dto/name.admin.output';

import { CreateCommentLikeAdminInput } from './dto/createCommentLike.admin.input';
import { UpdateCommentLikeAdminInput } from './dto/updateCommentLike.admin.input';

import { CommentLikeEntity } from './entities/commentLike.entity';
import { CommentLikeAdminRepository } from './entities/commentLike.admin.repository';

@Controller('admin/commentLike')
export class CommentLikeAdminController {
    constructor(
        private readonly commentLikeAdminRepository: CommentLikeAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<CommentLikeEntity[]> {
        return this.commentLikeAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<CommentLikeEntity> {
        return this.commentLikeAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateCommentLikeAdminInput, //
    ): Promise<CommentLikeEntity> {
        return this.commentLikeAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateCommentLikeAdminInput, //
    ): Promise<boolean> {
        const result = await this.commentLikeAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.commentLikeAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
