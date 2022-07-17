import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { FetchEpisodeReviewDto } from '../dto/fetchEpisodeReview.dto';
import { FetchEpisodeReviewOutput } from '../dto/fetchEpisodeReview.output';

import { NovelIndexReviewEntity } from './novelIndexReview.entity';

@Injectable()
export class NovelIndexReviewRepository {
    constructor(
        @InjectRepository(NovelIndexReviewEntity)
        private readonly episodeReviewRepository: Repository<NovelIndexReviewEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 전체 갯수 */
    async getCountAll(
        episodeID: string, //
    ): Promise<number> {
        return await this.episodeReviewRepository
            .createQueryBuilder('review')
            .select(['review.id', 'episode.id'])
            .leftJoin('review.novelIndex', 'episode')
            .where('review.user is not null')
            .where('episode.id=:id', { id: episodeID })
            .getCount();
    }

    /** 에피소드 리뷰 조회, page */
    async findReviewPage(
        dto: FetchEpisodeReviewDto, //
    ): Promise<FetchEpisodeReviewOutput> {
        const take = 10;

        const reviews = await this.episodeReviewRepository
            .createQueryBuilder('review')
            .leftJoinAndSelect('review.novelIndex', 'episode')
            .leftJoinAndSelect('review.user', 'user')
            .leftJoinAndSelect('user.userClass', 'class')
            .where('review.user is not null')
            .where('episode.id=:id', { id: dto.episodeID })
            .take(take)
            .skip(take * (dto.page - 1))
            .orderBy('review.createAt', 'DESC')
            .getMany();

        const count = await this.getCountAll(dto.episodeID);

        return {
            count: count,
            episodeReviews: reviews,
        };
    }

    /** 리뷰ID 기반 조회 */
    async findOneByReview(
        reviewID: string, //
    ): Promise<NovelIndexReviewEntity> {
        return await this.episodeReviewRepository.findOne({
            relations: ['user', 'novelIndex'],
            where: { id: reviewID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async save(
        entity: Partial<NovelIndexReviewEntity>,
    ): Promise<NovelIndexReviewEntity> {
        return await this.episodeReviewRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        reviewID: string, //
    ): Promise<UpdateResult> {
        return await this.episodeReviewRepository.softDelete(reviewID);
    }
}
