import { Body, Controller, Delete, Get, Param } from '@nestjs/common';

import { FileEntity } from './entities/file.entity';
import { FileAdminRepository } from './entities/file.admin.repository';
import { FileAdminService } from './file.admin.service';

@Controller('admin/file')
export class FileAdminController {
    constructor(
        private readonly fileAdminService: FileAdminService, //
        private readonly fileAdminRepository: FileAdminRepository,
    ) {}

    @Get('/all')
    findAll(): Promise<FileEntity[]> {
        return this.fileAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') fileID: string, //
    ): Promise<FileEntity> {
        return this.fileAdminRepository.findOne(fileID);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<object> {
        return await this.fileAdminService.bulkDeleteInGoogleStorage(IDs);
    }
}
