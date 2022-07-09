import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NovelEntity } from './novel.entity';

@Injectable()
export class NovelRepository {
    constructor(
        @InjectRepository(NovelEntity)
        private readonly novelRepository: Repository<NovelEntity>,
    ) {}

    async findAll(): Promise<NovelEntity[]> {
        return await this.novelRepository
            .createQueryBuilder('novel')
            .select([
                'novel.id',
                'novel.title',
                'novel.subtitle',
                'novel.description',
                'novel.likeCount',
                'novel.viewCount',
                'novel.createAt',
                'novel.updateAt',
                'user.id',
                'user.email',
            ])
            .leftJoin('novel.user', 'user')
            .leftJoinAndSelect('novel.novelCategory', 'category')
            .leftJoinAndSelect('novel.novelTags', 'tags')
            .leftJoinAndSelect('novel.novelIndexs', 'indexs')
            .leftJoinAndSelect('novel.novelReviews', 'reviews')
            .where('novel.user is not NULL')
            .getMany();
    }

    async save(
        novel: Partial<Omit<NovelEntity, 'id'>>, //
    ): Promise<NovelEntity> {
        return await this.novelRepository.save(novel);
    }

    async update(
        novel: Partial<NovelEntity>, //
    ): Promise<NovelEntity> {
        return await this.novelRepository.save(novel);
    }
}
