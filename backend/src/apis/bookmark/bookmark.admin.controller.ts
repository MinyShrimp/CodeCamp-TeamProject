// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { NameOutput } from 'src/commons/dto/name.admin.output';

import { CreateBookmarkAdminInput } from './dto/createBookmark.admin.input';
import { UpdateBookmarkAdminInput } from './dto/updateBookmark.admin.input';

import { BookmarkEntity } from './entities/bookmark.entity';
import { BookmarkAdminRepository } from './entities/bookmark.admin.repository';

@Controller('admin/bookmark')
export class BookmarkAdminController {
    constructor(
        private readonly bookmarkAdminRepository: BookmarkAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<BookmarkEntity[]> {
        return this.bookmarkAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<BookmarkEntity> {
        return this.bookmarkAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateBookmarkAdminInput, //
    ): Promise<BookmarkEntity> {
        return this.bookmarkAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateBookmarkAdminInput, //
    ): Promise<boolean> {
        const result = await this.bookmarkAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.bookmarkAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
