import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BookmarkEntity } from './bookmark.entity';
import { CreateBookmarkDto } from '../dto/createBookmark.dto';
import { DeleteBookmarkDto } from '../dto/deleteBookmark.dto';

@Injectable()
export class BookmarkRepository {
    constructor(
        @InjectRepository(BookmarkEntity)
        private readonly bookmarkRepository: Repository<BookmarkEntity>, //
    ) {}

    async findAll(): Promise<BookmarkEntity[]> {
        return await this.bookmarkRepository.find({
            relations: ['user', 'novelIndex'],
        });
    }

    async checkValid(
        dto: DeleteBookmarkDto, //
    ): Promise<BookmarkEntity> {
        return await this.bookmarkRepository
            .createQueryBuilder('bm')
            .select(['bm.id', 'bm.userID'])
            .where('bm.id=:id', { id: dto.bookmarkID })
            .andWhere('bm.userID=:userID', { userID: dto.userID })
            .getOne();
    }

    async duplicateCheck(
        userID: string,
        dto: CreateBookmarkDto, //
    ): Promise<BookmarkEntity> {
        return await this.bookmarkRepository
            .createQueryBuilder('bm')
            .select([
                'bm.id',
                'bm.userID',
                'bm.novelIndexID',
                'bm.isBoolean',
                'bm.page',
            ])
            .where('bm.userID=:userID', { userID: userID })
            .andWhere('bm.novelIndexID=:novelIndexID', {
                novelIndexID: dto.novelIndexID,
            })
            .andWhere('bm.page=:page', {
                page: dto.page,
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

    ///////////////////////////////////////////////////////////////////
    // 제거 //

    // async delete(
    //     bookmarkID: string, //
    // ): Promise<DeleteResult> {
    //     return await this.bookmarkRepository.delete({
    //         id: bookmarkID,
    //     });
    // }

    async softdelete(
        bookmarkID: string, //
    ): Promise<DeleteResult> {
        return await this.bookmarkRepository.softDelete(bookmarkID);
    }
}
