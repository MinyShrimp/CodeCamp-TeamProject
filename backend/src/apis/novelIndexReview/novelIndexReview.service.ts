import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { NovelIndexRepository } from '../novelIndex/entities/novelIndex.repository';
import { UserRepository } from '../user/entities/user.repository';
import { CreateNovelIndexReviewInput } from './dto/createNovelIndexReview.input';
import { UpdateNovelIndexReviewInput } from './dto/updateNovelIndexReview.input';
import { NovelIndexReviewEntity } from './entities/novelIndexReview.entity';
import { NovelIndexReviewRepository } from './entities/novelIndexReview.repository';

@Injectable()
export class NovelIndexReviewService {
    constructor(
        private readonly novelIndexRepository: NovelIndexRepository,
        private readonly episodeRepository: NovelIndexReviewRepository, //
        private readonly userRepository: UserRepository,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 해당 에피소드의 모든 리뷰 조회 */
    async findAll(
        episodeID: string, //
    ): Promise<NovelIndexReviewEntity[]> {
        return await this.episodeRepository.findAll(episodeID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성

    async createReview(
        userID: string, //
        input: CreateNovelIndexReviewInput,
    ): Promise<NovelIndexReviewEntity> {
        const { novelIndex, ...rest } = input;

        const user = await this.userRepository.findOneByID(userID);
        const episode = await this.novelIndexRepository.getOne(novelIndex);

        if (episode === undefined || episode === null) {
            throw new ConflictException(
                MESSAGES.NOVEL_INDEX_UNVALID, //
            );
        }

        return await this.episodeRepository.save({
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
        const { novelIndex, ...rest } = input;

        const review = await this.episodeRepository.findOneByReview(novelIndex);

        if (!review) throw new ConflictException(MESSAGES.NOVEL_INDEX_UNVALID);

        return await this.episodeRepository.save({
            ...review,
            ...rest,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        reviewID: string, //
    ): Promise<string> {
        const result = await this.episodeRepository.softDelete(reviewID);
        return result.affected
            ? MESSAGES.NOVEL_INDEX_REVIEW_SOFT_DELETE_SUCCESSED
            : MESSAGES.NOVEL_INDEX_REVIEW_SOFT_DELETE_FAILED;
    }
}
