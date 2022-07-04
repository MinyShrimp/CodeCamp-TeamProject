import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateNovelIndexReviewAdminInput } from '../dto/createNovelIndexReview.admin.input';
import { UpdateNovelIndexReviewAdminInput } from '../dto/updateNovelIndexReview.admin.input';

import { NovelIndexReviewEntity } from './novelIndexReview.entity';

@Injectable()
export class NovelIndexReviewAdminRepository {
    constructor(
        @InjectRepository(NovelIndexReviewEntity)
        private readonly novelIndexReviewRepository: Repository<NovelIndexReviewEntity>,
    ) {}

    private readonly _selector = [];

    async findAll(): Promise<NovelIndexReviewEntity[]> {
        return await this.novelIndexReviewRepository
            .createQueryBuilder('novelIndexReview')
            .select(this._selector)
            .withDeleted()
            .orderBy('novelIndexReview.createAt')
            .getMany();
    }

    async findAllNames(): Promise<NovelIndexReviewEntity[]> {
        return await this.novelIndexReviewRepository
            .createQueryBuilder('novelIndexReview')
            .select(['novelIndexReview.id', 'novelIndexReview.name'])
            .orderBy('novelIndexReview.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<NovelIndexReviewEntity> {
        return await this.novelIndexReviewRepository
            .createQueryBuilder('novelIndexReview')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('novelIndexReview.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateNovelIndexReviewAdminInput, //
    ): Promise<NovelIndexReviewEntity> {
        return await this.novelIndexReviewRepository.save(input);
    }

    async update(
        input: UpdateNovelIndexReviewAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.novelIndexReviewRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.novelIndexReviewRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
