import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { NovelIndexModule } from '../novelIndex/novelIndex.module';

import { BookmarkEntity } from './entities/bookmark.entity';
import { BookmarkService } from './bookmark.service';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkRepository } from './entities/bookmark.repository';
import { BookmarkAdminController } from './bookmark.admin.controller';
import { BookmarkAdminRepository } from './entities/bookmark.admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BookmarkEntity, //
        ]),
        UserModule,
        NovelIndexModule,
    ],
    controllers: [
        BookmarkAdminController, //
    ],
    providers: [
        BookmarkService,
        BookmarkResolver,
        BookmarkRepository,
        BookmarkAdminRepository, //
    ],
})
export class BookmarkModule {}
