import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

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
