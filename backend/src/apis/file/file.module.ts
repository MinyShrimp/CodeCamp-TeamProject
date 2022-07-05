import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileAdminRepository } from './entities/file.admin.repository';

import { FileEntity } from './entities/file.entity';
import { FileAdminController } from './file.admin.controller';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FileEntity, //
        ]),
    ],
    exports: [FileService],
    controllers: [FileAdminController],
    providers: [
        FileResolver, //
        FileService,

        FileAdminRepository,
    ],
})
export class FileModule {}
