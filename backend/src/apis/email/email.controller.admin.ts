import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { EmailEntity } from './entities/email.entity';
import { EmailAdminRepository } from './entities/email.repository.admin';

@Controller('admin/email')
export class EmailAdminController {
    constructor(
        private readonly emailAdminRepository: EmailAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<EmailEntity[]> {
        return this.emailAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<EmailEntity> {
        return this.emailAdminRepository.findOne(id);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.emailAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
