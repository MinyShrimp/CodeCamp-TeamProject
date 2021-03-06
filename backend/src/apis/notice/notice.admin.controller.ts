// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NoticeEntity } from './entities/notice.entity';
import { NoticeAdminRepository } from './entities/notice.admin.repository';
import { CreateNoticeAdminInput } from './dto/createNotice.admin.input';
import { UpdateNoticeAdminInput } from './dto/updateNotice.admin.input';

@ApiTags('관리자/공지')
@Controller('api/admin/notice')
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
