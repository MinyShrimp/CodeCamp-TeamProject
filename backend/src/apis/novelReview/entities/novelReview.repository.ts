import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { NovelReviewEntity } from './novelReview.entity';

@Injectable()
export class NovelReviewRepository {
    constructor(
        @InjectRepository(NovelReviewEntity)
        private readonly novelReviewRepository: Repository<NovelReviewEntity>, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 전체 조회 */

    async findAll(
        novelID: string, //
    ): Promise<NovelReviewEntity[]> {
        return await this.novelReviewRepository.find({
            relations: ['user', 'novel'],
            where: { novel: novelID },
        });
    }

    /** 리뷰ID 기반 조회 */
    async findOneByReview(
        reviewID: string, //
    ): Promise<NovelReviewEntity> {
        return await this.novelReviewRepository.findOne({
            relations: ['user', 'novel'],
            where: { id: reviewID },
        });
    }

    /** 유저ID 기반 조회 */
    async findByIDFromNReview(
        userID: string, //
    ): Promise<NovelReviewEntity[]> {
        return await this.novelReviewRepository.find({
            relations: ['novel', 'user'],
            where: { user: userID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async save(
        entity: Partial<NovelReviewEntity>, //
    ): Promise<NovelReviewEntity> {
        return await this.novelReviewRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        reviewID: string, //
    ): Promise<UpdateResult> {
        return await this.novelReviewRepository.softDelete(reviewID);
    }
}
