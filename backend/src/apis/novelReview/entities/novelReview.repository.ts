import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { FetchNovelReviewsOutput } from '../dto/fetchNovelReviews.output';
import { FetchNovelReviewsPageDto } from '../dto/fetchPage.dto';

import { NovelReviewEntity } from './novelReview.entity';

@Injectable()
export class NovelReviewRepository {
    constructor(
        @InjectRepository(NovelReviewEntity)
        private readonly novelReviewRepository: Repository<NovelReviewEntity>, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 소설 리뷰 목록 전체 갯수 */
    async getCountAll(
        novelID: string, //
    ): Promise<number> {
        return await this.novelReviewRepository
            .createQueryBuilder('review')
            .select(['review.id', 'novel.id'])
            .leftJoin('review.novel', 'novel')
            .where('novel.id=:id', { id: novelID })
            .getCount();
    }

    /** 소설 리뷰 목록 조회 */
    async findPage(
        dto: FetchNovelReviewsPageDto, //
    ): Promise<FetchNovelReviewsOutput> {
        const take = 10;

        const reviews = await this.novelReviewRepository
            .createQueryBuilder('review')
            .leftJoinAndSelect('review.novel', 'novel')
            .leftJoinAndSelect('review.user', 'user')
            .leftJoinAndSelect('user.userClass', 'class')
            .where('novel.id=:id', { id: dto.novelID })
            .take(take)
            .skip(take * (dto.page - 1))
            .orderBy('review.createAt', 'DESC')
            .getMany();

        const count = await this.getCountAll(dto.novelID);

        return {
            novelRivews: reviews,
            count: count,
        };
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
