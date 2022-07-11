// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NovelDonateEntity } from './entities/novelDonate.entity';
import { NovelDonateAdminRepository } from './entities/novelDonate.admin.repository';

@ApiTags('관리자/회원/후원작')
@Controller('admin/novel-donate')
export class NovelDonateAdminController {
    constructor(
        private readonly novelDonateAdminRepository: NovelDonateAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<NovelDonateEntity[]> {
        return this.novelDonateAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<NovelDonateEntity> {
        return this.novelDonateAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelDonateAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
