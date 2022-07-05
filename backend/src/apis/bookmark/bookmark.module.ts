import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookmarkEntity } from './entities/bookmark.entity';
import { BookmarkAdminRepository } from './entities/bookmark.admin.repository';

import { BookmarkAdminController } from './bookmark.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BookmarkEntity, //
        ]),
    ],
    controllers: [
        BookmarkAdminController, //
    ],
    providers: [
        BookmarkAdminRepository, //
    ],
})
export class BookmarkModule {}
