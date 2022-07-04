import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateNovelIndexAdminInput } from '../dto/createNovelIndex.admin.input';
import { UpdateNovelIndexAdminInput } from '../dto/updateNovelIndex.admin.input';

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
        'n.id', 'n.title'
    ];

    async findAll(): Promise<NovelIndexEntity[]> {
        return await this.novelIndexRepository
            .createQueryBuilder('i')
            .select(this._selector)
            .withDeleted()
            .leftJoin('i.novel', 'n')
            .orderBy('i.createAt')
            .getMany();
    }

    async findAllNames(): Promise<NovelIndexEntity[]> {
        return await this.novelIndexRepository
            .createQueryBuilder('i')
            .select(['i.id', 'i.title'])
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
            ])
            .withDeleted()
            .leftJoin('i.novel', 'n')
            .where('i.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateNovelIndexAdminInput, //
    ): Promise<NovelIndexEntity> {
        return await this.novelIndexRepository.save(input);
    }

    async update(
        input: UpdateNovelIndexAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.novelIndexRepository.update({ id: originID }, rest);
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
