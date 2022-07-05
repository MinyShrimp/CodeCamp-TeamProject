import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { NovelIndexEntity } from './novelIndex.entity';

@Injectable()
export class NovelIndexAdminRepository {
    constructor(
        @InjectRepository(NovelIndexEntity)
        private readonly novelIndexRepository: Repository<NovelIndexEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'i.id', 'i.title', 'i.contents', 'i.index', 'i.star', 
        'i.createAt', 'i.updateAt', 'i.deleteAt',
        'n.id', 'n.title', 'u.id', 'u.email',
    ];

    async findAll(): Promise<NovelIndexEntity[]> {
        return await this.novelIndexRepository
            .createQueryBuilder('i')
            .select(this._selector)
            .withDeleted()
            .leftJoin('i.user', 'u')
            .leftJoin('i.novel', 'n')
            .orderBy('i.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<NovelIndexEntity> {
        return await this.novelIndexRepository
            .createQueryBuilder('i')
            .select([
                ...this._selector, //
                'r.id',
                'r.contents',
            ])
            .withDeleted()
            .leftJoin('i.user', 'u')
            .leftJoin('i.novel', 'n')
            .leftJoin('i.novelIndexReviews', 'r')
            .where('i.id=:id', { id: id })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.novelIndexRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
