// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BookmarkEntity } from './entities/bookmark.entity';
import { BookmarkAdminRepository } from './entities/bookmark.admin.repository';

@ApiTags('관리자/북마크')
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

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.bookmarkAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
