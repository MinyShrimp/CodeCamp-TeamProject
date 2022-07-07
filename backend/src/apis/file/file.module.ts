import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileEntity } from './entities/file.entity';
import { FileRepository } from './entities/file.repository';
import { FileAdminRepository } from './entities/file.admin.repository';

import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { FileAdminService } from './file.admin.service';
import { FileAdminController } from './file.admin.controller';
import { GoogleStorageSerivce } from './gStorage.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FileEntity, //
        ]),
    ],
    exports: [FileService, GoogleStorageSerivce],
    controllers: [FileAdminController],
    providers: [
        FileResolver, //
        FileService,

        FileRepository,
        FileAdminService,
        FileAdminRepository,
        GoogleStorageSerivce,
    ],
})
export class FileModule {}
