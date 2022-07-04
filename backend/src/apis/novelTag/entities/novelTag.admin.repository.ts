import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateNovelTagAdminInput } from '../dto/createNovelTag.admin.input';
import { UpdateNovelTagAdminInput } from '../dto/updateNovelTag.admin.input';

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
            .withDeleted()
            .orderBy('t.createAt')
            .getMany();
    }

    async findAllNames(): Promise<NovelTagEntity[]> {
        return await this.novelTagRepository
            .createQueryBuilder('t')
            .select(['t.id', 't.name'])
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
            .withDeleted()
            .where('t.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateNovelTagAdminInput, //
    ): Promise<NovelTagEntity> {
        return await this.novelTagRepository.save(input);
    }

    async update(
        input: UpdateNovelTagAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.novelTagRepository.update({ id: originID }, rest);
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
