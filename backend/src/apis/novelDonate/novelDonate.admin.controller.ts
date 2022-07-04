// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateNovelDonateAdminInput } from './dto/createNovelDonate.admin.input';
import { UpdateNovelDonateAdminInput } from './dto/updateNovelDonate.admin.input';

import { NovelDonateEntity } from './entities/novelDonate.entity';
import { NovelDonateAdminRepository } from './entities/novelDonate.admin.repository';

@Controller('admin/novelDonate')
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

    @Post('/')
    create(
        @Body() input: CreateNovelDonateAdminInput, //
    ): Promise<NovelDonateEntity> {
        return this.novelDonateAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdateNovelDonateAdminInput, //
    ): Promise<boolean> {
        const result = await this.novelDonateAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.novelDonateAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
