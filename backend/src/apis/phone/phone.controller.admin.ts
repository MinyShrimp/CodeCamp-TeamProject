import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { PhoneEntity } from './entities/phone.entity';
import { PhoneAdminRepository } from './entities/phone.repository.admin';

@Controller('admin')
export class PhoneAdminController {
    constructor(
        private readonly phoneAdminRepository: PhoneAdminRepository, //
    ) {}

    @Get('/phones')
    findAll(): Promise<PhoneEntity[]> {
        return this.phoneAdminRepository.findAll();
    }

    @Get('/phone/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<PhoneEntity> {
        return this.phoneAdminRepository.findOne(id);
    }

    @Delete('/phones')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.phoneAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
