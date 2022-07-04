import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateNovelReviewAdminInput } from '../dto/createNovelReview.admin.input';
import { UpdateNovelReviewAdminInput } from '../dto/updateNovelReview.admin.input';

import { NovelReviewEntity } from './novelReview.entity';

@Injectable()
export class NovelReviewAdminRepository {
    constructor(
        @InjectRepository(NovelReviewEntity)
        private readonly novelReviewRepository: Repository<NovelReviewEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'r.id', 'r.contents', 'r.likeCount', 'r.dislikeCount', 'r.star',
        'r.createAt', 'r.updateAt', 'r.deleteAt', 
        'u.id', 'u.email', 'n.id', 'n.title'
    ];

    async findAll(): Promise<NovelReviewEntity[]> {
        return await this.novelReviewRepository
            .createQueryBuilder('r')
            .select(this._selector)
            .withDeleted()
            .leftJoin('r.user', 'u')
            .leftJoin('r.novel', 'n')
            .orderBy('r.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<NovelReviewEntity> {
        return await this.novelReviewRepository
            .createQueryBuilder('r')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .leftJoin('r.user', 'u')
            .leftJoin('r.novel', 'n')
            .where('r.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateNovelReviewAdminInput, //
    ): Promise<NovelReviewEntity> {
        return await this.novelReviewRepository.save(input);
    }

    async update(
        input: UpdateNovelReviewAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.novelReviewRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.novelReviewRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
