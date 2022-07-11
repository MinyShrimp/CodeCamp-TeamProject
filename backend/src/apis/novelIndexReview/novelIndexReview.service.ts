import { ConflictException, Injectable } from '@nestjs/common';
import { NovelIndexRepository } from '../novelIndex/entities/novelIndex.repository';
import { UserRepository } from '../user/entities/user.repository';
import { CreateNovelIndexReviewInput } from './dto/createNovelIndexReview.input';
import { NovelIndexReviewEntity } from './entities/novelIndexReview.entity';
import { NovelIndexReviewRepository } from './entities/novelIndexReview.repository';

@Injectable()
export class NovelIndexReviewService {
    constructor(
        private readonly episodeRepository: NovelIndexReviewRepository, //
        private readonly novelIndexRepository: NovelIndexRepository,
        private readonly userRepository: UserRepository,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

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
            throw new ConflictException('에러');
        }

        return await this.episodeRepository.save({
            user,
            novelIndex: episode,
            ...rest,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 소설 리뷰 수정

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
