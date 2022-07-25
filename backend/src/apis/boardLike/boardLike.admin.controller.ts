// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { BoardLikeEntity } from './entities/boardLike.entity';
import { BoardLikeAdminRepository } from './entities/boardLike.admin.repository';
import { CreateBoardLikeAdminInput } from './dto/createBoardLike.admin.input';
import { UpdateBoardLikeAdminInput } from './dto/updateBoardLike.admin.input';

@Controller('admin/boardLike')
export class BoardLikeAdminController {
    constructor(
        private readonly boardLikeAdminRepository: BoardLikeAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<BoardLikeEntity[]> {
        return this.boardLikeAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<BoardLikeEntity> {
        return this.boardLikeAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateBoardLikeAdminInput, //
    ): Promise<BoardLikeEntity> {
        return this.boardLikeAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateBoardLikeAdminInput, //
    ): Promise<boolean> {
        const result = await this.boardLikeAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.boardLikeAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
