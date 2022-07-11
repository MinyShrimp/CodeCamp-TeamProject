import { ConflictException, Injectable, Query } from '@nestjs/common';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { NovelRepository } from '../novel/entities/novel.repository';
import { UserRepository } from '../user/entities/user.repository';
import { CreateNovelReviewInput } from './dto/createNovelReview.input';
import { UpdateNovelReviewInput } from './dto/updateNovelReview.input';
import { NovelReviewEntity } from './entities/novelReview.entity';
import { NovelReviewRepository } from './entities/novelReview.repository';

@Injectable()
export class NovelReviewService {
    constructor(
        private readonly novelReviewRepository: NovelReviewRepository, //
        private readonly novelRepository: NovelRepository,
        private readonly userRepository: UserRepository,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 해당 소설의 모든 리뷰 조회 */
    async findAll(
        novelID: string, //
    ): Promise<NovelReviewEntity[]> {
        return await this.novelReviewRepository.findAll(novelID);
    }

    /** 해당 유저가 쓴 모든 리뷰 조회 */
    async findTargetReview(
        userID: IPayload, //
    ): Promise<NovelReviewEntity[]> {
        return await this.novelReviewRepository.findByIDFromNReview(userID.id);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성
    async createReview(
        userID: string, //
        novelID: string,
        input: CreateNovelReviewInput,
    ): Promise<NovelReviewEntity> {
        const user = await this.userRepository.findOneByID(userID);
        const novel = await this.novelRepository.getOne(novelID);

        // 해당 소설이 존재하지 않을 시 에러
        if (novel === undefined || novel === null) {
            throw new ConflictException(
                MESSAGES.NOVEL_UNVALID, //
            );
        }

        return await this.novelReviewRepository.save({
            user,
            novel,
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 소설 리뷰 수정

    async updateReview(
        input: UpdateNovelReviewInput, //
    ): Promise<NovelReviewEntity> {
        const novel = await this.novelRepository.getOne(input.id);
        const review = await this.novelReviewRepository.findOneByReview(
            input.id,
        );

        console.log('여기는 서비스 리뷰===========', review);
        if (!review) throw new ConflictException(MESSAGES.NOVEL_REVIEW_UNVALID);

        return await this.novelReviewRepository.save({
            ...review,
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        reviewID: string, //
    ): Promise<string> {
        const result = await this.novelReviewRepository.softDelete(reviewID);
        return result.affected
            ? MESSAGES.NOVEL_REVIEW_SOFT_DELETE_SUCCESSED
            : MESSAGES.NOVEL_REVIEW_SOFT_DELETE_FAILED;
    }
}
