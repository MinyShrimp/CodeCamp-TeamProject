import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { UserRepository } from '../user/entities/user.repository';
import { NovelIndexRepository } from '../novelIndex/entities/novelIndex.repository';

import { NovelIndexReviewEntity } from './entities/novelIndexReview.entity';
import { NovelIndexReviewRepository } from './entities/novelIndexReview.repository';
import { CreateNovelIndexReviewInput } from './dto/createNovelIndexReview.input';
import { UpdateNovelIndexReviewInput } from './dto/updateNovelIndexReview.input';

@Injectable()
export class NovelIndexReviewService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly episodeRepository: NovelIndexRepository,
        private readonly episodeReviewRepository: NovelIndexReviewRepository, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성

    async createReview(
        userID: string, //
        input: CreateNovelIndexReviewInput,
    ): Promise<NovelIndexReviewEntity> {
        const { episodeID, ...rest } = input;

        const user = await this.userRepository.findOneByID(userID);
        const episode = await this.episodeRepository.getOne(episodeID);

        if (episode === undefined || episode === null) {
            throw new ConflictException(
                MESSAGES.NOVEL_INDEX_UNVALID, //
            );
        }

        return await this.episodeReviewRepository.save({
            user,
            novelIndex: episode,
            ...rest,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 에피소드별 리뷰 수정

    async updateReview(
        input: UpdateNovelIndexReviewInput, //
    ): Promise<NovelIndexReviewEntity> {
        const review = await this.episodeReviewRepository.findOneByReview(
            input.id,
        );
        if (review === undefined || review === null) {
            throw new ConflictException('에피소드 리뷰를 찾을 수 없습니다.');
        }

        return await this.episodeReviewRepository.save({
            ...review,
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        reviewID: string, //
    ): Promise<boolean> {
        const result = await this.episodeReviewRepository.softDelete(reviewID);
        return result.affected ? true : false;
    }
}
