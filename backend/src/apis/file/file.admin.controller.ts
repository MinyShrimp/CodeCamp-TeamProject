import { Body, Controller, Delete, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { FileAdminRepository } from './entities/file.admin.repository';
import { FileEntity } from './entities/file.entity';

@Controller('admin')
export class FileAdminController {
    constructor(
        private readonly fileRepository: FileAdminRepository, //
    ) {}

    @Get('/files')
    findAll(): Promise<FileEntity[]> {
        return this.fileRepository.findAll();
    }

    @Get('/file/:id')
    findOne(
        @Param('id') fileID: string, //
    ): Promise<FileEntity> {
        return this.fileRepository.findOne(fileID);
    }

    @Delete('/files')
    async bulkDelete(
        @Req() req: Request, //
    ) {
        await this.fileRepository.bulkDelete(req.body);
        return 'file delete ok';
    }
}
