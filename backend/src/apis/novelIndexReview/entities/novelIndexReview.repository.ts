import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { NovelIndexReviewEntity } from './novelIndexReview.entity';

@Injectable()
export class NovelIndexReviewRepository {
    constructor(
        @InjectRepository(NovelIndexReviewEntity)
        private readonly episodeRepository: Repository<NovelIndexReviewEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async save(
        entity: Partial<NovelIndexReviewEntity>,
    ): Promise<NovelIndexReviewEntity> {
        return await this.episodeRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
    async softDelete(
        reviewID: string, //
    ): Promise<UpdateResult> {
        return await this.episodeRepository.softDelete(reviewID);
    }
}
