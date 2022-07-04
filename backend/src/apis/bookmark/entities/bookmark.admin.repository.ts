import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateBookmarkAdminInput } from '../dto/createBookmark.admin.input';
import { UpdateBookmarkAdminInput } from '../dto/updateBookmark.admin.input';

import { BookmarkEntity } from './bookmark.entity';

@Injectable()
export class BookmarkAdminRepository {
    constructor(
        @InjectRepository(BookmarkEntity)
        private readonly bookmarkRepository: Repository<BookmarkEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'bm.id', 'bm.page', 'bm.createAt', 'bm.deleteAt',
        'u.id', 'u.email', 'ni.id', 'ni.title',
    ];

    async findAll(): Promise<BookmarkEntity[]> {
        return await this.bookmarkRepository
            .createQueryBuilder('bm')
            .select(this._selector)
            .withDeleted()
            .leftJoin('bm.user', 'u')
            .leftJoin('bm.novelIndex', 'ni')
            .orderBy('bm.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<BookmarkEntity> {
        return await this.bookmarkRepository
            .createQueryBuilder('bm')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .leftJoin('bm.user', 'u')
            .leftJoin('bm.novelIndex', 'ni')
            .where('bm.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateBookmarkAdminInput, //
    ): Promise<BookmarkEntity> {
        return await this.bookmarkRepository.save(input);
    }

    async update(
        input: UpdateBookmarkAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.bookmarkRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.bookmarkRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
