import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { EmailEntity } from './entities/email.entity';
import { EmailAdminRepository } from './entities/email.repository.admin';

@Controller('admin')
export class EmailAdminController {
    constructor(
        private readonly emailAdminRepository: EmailAdminRepository, //
    ) {}

    @Get('/emails')
    findAll(): Promise<EmailEntity[]> {
        return this.emailAdminRepository.findAll();
    }

    @Get('/email/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<EmailEntity> {
        return this.emailAdminRepository.findOne(id);
    }

    @Delete('/emails')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.emailAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
