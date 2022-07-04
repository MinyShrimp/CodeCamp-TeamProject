// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateBoardAdminInput } from './dto/createBoard.admin.input';
import { UpdateBoardAdminInput } from './dto/updateBoard.admin.input';

import { BoardEntity } from './entities/board.entity';
import { BoardAdminRepository } from './entities/board.admin.repository';

@Controller('admin/board')
export class BoardAdminController {
    constructor(
        private readonly boardAdminRepository: BoardAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<BoardEntity[]> {
        return this.boardAdminRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<string>> {
        const results = await this.boardAdminRepository.findAllNames();
        return results.map((r) => r.id);
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<BoardEntity> {
        return this.boardAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateBoardAdminInput, //
    ): Promise<BoardEntity> {
        return this.boardAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateBoardAdminInput, //
    ): Promise<boolean> {
        const result = await this.boardAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.boardAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
