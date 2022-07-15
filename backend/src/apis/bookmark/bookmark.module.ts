import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookmarkEntity } from './entities/bookmark.entity';
import { BookmarkAdminRepository } from './entities/bookmark.admin.repository';

import { BookmarkAdminController } from './bookmark.admin.controller';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkService } from './bookmark.service';
import { BookmarkRepository } from './entities/bookmark.repository';
import { UserModule } from '../user/user.module';
import { NovelIndexModule } from '../novelIndex/novelIndex.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BookmarkEntity, //
        ]),
        NovelIndexModule,
        UserModule,
    ],
    controllers: [
        BookmarkAdminController, //
    ],
    providers: [
        BookmarkAdminRepository, //
        BookmarkRepository,
        BookmarkResolver,
        BookmarkService,
    ],
})
export class BookmarkModule {}
