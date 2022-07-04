import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { NovelEntity } from './novel.entity';

@Injectable()
export class NovelAdminRepository {
    constructor(
        @InjectRepository(NovelEntity)
        private readonly novelRepository: Repository<NovelEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'n.id', 'n.title', 'n.subtitle', 'n.description',
        'n.likeCount', 'n.createAt', 'n.updateAt', 'n.deleteAt',
        'u.id', 'u.email', 't.id', 't.name', 
        'i.id', 'i.title', 'r.id', 'r.contents'
    ];

    async findAll(): Promise<NovelEntity[]> {
        return await this.novelRepository
            .createQueryBuilder('n')
            .select(this._selector)
            .withDeleted()
            .orderBy('n.createAt')
            .leftJoin('n.user', 'u')
            .leftJoin('n.novelTags', 't')
            .leftJoin('n.novelIndexs', 'i')
            .leftJoin('n.novelReviews', 'r')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<NovelEntity> {
        return await this.novelRepository
            .createQueryBuilder('n')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .leftJoin('n.user', 'u')
            .leftJoin('n.novelTags', 't')
            .leftJoin('n.novelIndexs', 'i')
            .leftJoin('n.novelReviews', 'r')
            .where('n.id=:id', { id: id })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.novelRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
