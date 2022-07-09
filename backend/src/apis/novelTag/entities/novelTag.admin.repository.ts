import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { NovelTagEntity } from './novelTag.entity';

@Injectable()
export class NovelTagAdminRepository {
    constructor(
        @InjectRepository(NovelTagEntity)
        private readonly novelTagRepository: Repository<NovelTagEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        't.id', 't.name', 't.createAt',
    ];

    async findAll(): Promise<NovelTagEntity[]> {
        return await this.novelTagRepository
            .createQueryBuilder('t')
            .select(this._selector)
            .orderBy('t.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<NovelTagEntity> {
        return await this.novelTagRepository
            .createQueryBuilder('t')
            .select([
                ...this._selector, //
            ])
            .where('t.id=:id', { id: id })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.novelTagRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
