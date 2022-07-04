import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateNovelLikeAdminInput } from '../dto/createNovelLike.admin.input';
import { UpdateNovelLikeAdminInput } from '../dto/updateNovelLike.admin.input';

import { NovelLikeEntity } from './novelLike.entity';

@Injectable()
export class NovelLikeAdminRepository {
    constructor(
        @InjectRepository(NovelLikeEntity)
        private readonly novelLikeRepository: Repository<NovelLikeEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'ln.id', 'ln.createAt',
        'u.id', 'u.email', 'n.id', 'n.title'
    ];

    async findAll(): Promise<NovelLikeEntity[]> {
        return await this.novelLikeRepository
            .createQueryBuilder('ln')
            .select(this._selector)
            .withDeleted()
            .leftJoin('ln.user', 'u')
            .leftJoin('ln.novel', 'n')
            .orderBy('ln.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<NovelLikeEntity> {
        return await this.novelLikeRepository
            .createQueryBuilder('ln')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .leftJoin('ln.user', 'u')
            .leftJoin('ln.novel', 'n')
            .where('ln.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateNovelLikeAdminInput, //
    ): Promise<NovelLikeEntity> {
        return await this.novelLikeRepository.save(input);
    }

    async update(
        input: UpdateNovelLikeAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.novelLikeRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.novelLikeRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
