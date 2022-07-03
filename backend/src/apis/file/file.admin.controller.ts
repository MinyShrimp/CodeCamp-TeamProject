import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { FileAdminRepository } from './entities/file.admin.repository';
import { FileEntity } from './entities/file.entity';

@Controller('admin/file')
export class FileAdminController {
    constructor(
        private readonly fileRepository: FileAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<FileEntity[]> {
        return this.fileRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') fileID: string, //
    ): Promise<FileEntity> {
        return this.fileRepository.findOne(fileID);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ) {
        await this.fileRepository.bulkDelete(IDs);
        return 'file delete ok';
    }
}
