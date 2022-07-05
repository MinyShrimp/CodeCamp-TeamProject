// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateNoticeAdminInput } from './dto/createNotice.admin.input';
import { UpdateNoticeAdminInput } from './dto/updateNotice.admin.input';

import { NoticeEntity } from './entities/notice.entity';
import { NoticeAdminRepository } from './entities/notice.admin.repository';

@Controller('admin/notice')
export class NoticeAdminController {
    constructor(
        private readonly noticeAdminRepository: NoticeAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NoticeEntity[]> {
        return this.noticeAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NoticeEntity> {
        return this.noticeAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreateNoticeAdminInput, //
    ): Promise<NoticeEntity> {
        return this.noticeAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateNoticeAdminInput, //
    ): Promise<boolean> {
        const result = await this.noticeAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.noticeAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
