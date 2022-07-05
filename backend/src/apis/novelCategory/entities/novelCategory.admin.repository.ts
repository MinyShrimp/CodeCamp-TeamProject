import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateNovelCategoryAdminInput } from '../dto/createNovelCategory.admin.input';
import { UpdateNovelCategoryAdminInput } from '../dto/updateNovelCategory.admin.input';

import { NovelCategoryEntity } from './novelCategory.entity';

@Injectable()
export class NovelCategoryAdminRepository {
    constructor(
        @InjectRepository(NovelCategoryEntity)
        private readonly novelCategoryRepository: Repository<NovelCategoryEntity>,
    ) {}

    private readonly _selector = [
        'novelCategory.id',
        'novelCategory.name', //
    ];

    async findAll(): Promise<NovelCategoryEntity[]> {
        return await this.novelCategoryRepository
            .createQueryBuilder('novelCategory')
            .select(this._selector)
            .withDeleted()
            .getMany();
    }

    async findAllNames(): Promise<NovelCategoryEntity[]> {
        return await this.novelCategoryRepository
            .createQueryBuilder('novelCategory')
            .select(['novelCategory.id', 'novelCategory.name'])
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<NovelCategoryEntity> {
        return await this.novelCategoryRepository
            .createQueryBuilder('novelCategory')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('novelCategory.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateNovelCategoryAdminInput, //
    ): Promise<NovelCategoryEntity> {
        return await this.novelCategoryRepository.save(input);
    }

    async update(
        input: UpdateNovelCategoryAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.novelCategoryRepository.update(
            { id: originID },
            rest,
        );
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.novelCategoryRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
