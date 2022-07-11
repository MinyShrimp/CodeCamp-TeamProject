import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NovelReviewEntity } from './novelReview.entity';

@Injectable()
export class NovelReviewRepository {
    constructor(
        @InjectRepository(NovelReviewEntity)
        private readonly novelReviewRepository: Repository<NovelReviewEntity>, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async save(
        entity: Partial<NovelReviewEntity>, //
    ): Promise<NovelReviewEntity> {
        return await this.novelReviewRepository.save(entity);
    }
}
