// prettier-ignore
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';

import { BoardEntity } from './entities/board.entity';
import { BoardAdminRepository } from './entities/board.admin.repository';

@ApiTags('관리자/게시판')
@Controller('api/admin/board')
export class BoardAdminController {
    constructor(
        private readonly boardAdminRepository: BoardAdminRepository, //
    ) {}

    @ApiOperation({
        summary: '모든 게시판 목록 API',
    })
    @Get('/all')
    findAll(): Promise<BoardEntity[]> {
        return this.boardAdminRepository.findAll();
    }

    @ApiOperation({
        summary: '단일 게시판 목록 API',
    })
    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<BoardEntity> {
        return this.boardAdminRepository.findOne(id);
    }

    @ApiOperation({
        summary: '게시판 글 삭제 API',
    })
    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.boardAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
