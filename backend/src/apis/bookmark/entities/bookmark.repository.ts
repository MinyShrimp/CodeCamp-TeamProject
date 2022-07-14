import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BookmarkEntity } from './bookmark.entity';
import { CreateBookmarkDto } from '../dto/createBookmark.dto';

@Injectable()
export class BookmarkRepository {
    constructor(
        @InjectRepository(BookmarkEntity)
        private readonly bookmarkRepository: Repository<BookmarkEntity>, //
    ) {}

    async duplicateCheck(
        dto: CreateBookmarkDto, //
    ): Promise<BookmarkEntity> {
        return await this.bookmarkRepository
            .createQueryBuilder('bm')
            .select(['bm.id', 'bm.userID', 'bm.novelIndexID'])
            .where('bm.userID=:userID', { userID: dto.userID })
            .andWhere('bm.novelIndexID=:novelIndexID', {
                novelIndexID: dto.novelIndexID,
            })
            .getOne();
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async save(
        bookmark: Partial<Omit<BookmarkEntity, 'id'>>, //
    ): Promise<BookmarkEntity> {
        return await this.bookmarkRepository.save(bookmark);
    }
}
