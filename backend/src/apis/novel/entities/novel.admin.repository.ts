import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateNovelAdminInput } from '../dto/createNovel.admin.input';
import { UpdateNovelAdminInput } from '../dto/updateNovel.admin.input';

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
        'u.id', 'u.email', 't.id', 't.name', 'i.id', 'i.title',
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
            .getMany();
    }

    async findAllNames(): Promise<NovelEntity[]> {
        return await this.novelRepository
            .createQueryBuilder('n')
            .select(['n.id', 'n.title'])
            .orderBy('n.createAt')
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
            .where('n.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateNovelAdminInput, //
    ): Promise<NovelEntity> {
        return await this.novelRepository.save(input);
    }

    async update(
        input: UpdateNovelAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.novelRepository.update({ id: originID }, rest);
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
