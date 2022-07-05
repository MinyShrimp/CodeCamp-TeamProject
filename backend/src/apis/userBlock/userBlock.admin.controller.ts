// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';

import { UserBlockEntity } from './entities/userBlock.entity';
import { UserBlockAdminRepository } from './entities/userBlock.admin.repository';

@Controller('admin/userBlock')
export class UserBlockAdminController {
    constructor(
        private readonly userBlockAdminRepository: UserBlockAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<UserBlockEntity[]> {
        return this.userBlockAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<UserBlockEntity> {
        return this.userBlockAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.userBlockAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
