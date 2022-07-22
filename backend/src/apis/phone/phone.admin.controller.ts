import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PhoneEntity } from './entities/phone.entity';
import { PhoneAdminRepository } from './entities/phone.admin.repository';

@ApiTags('관리자/회원/핸드폰 인증')
@Controller('api/admin/phone')
export class PhoneAdminController {
    constructor(
        private readonly phoneAdminRepository: PhoneAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<PhoneEntity[]> {
        return this.phoneAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<PhoneEntity> {
        return this.phoneAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.phoneAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
