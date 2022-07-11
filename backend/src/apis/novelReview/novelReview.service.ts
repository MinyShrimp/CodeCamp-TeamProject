import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { NovelRepository } from '../novel/entities/novel.repository';
import { UserRepository } from '../user/entities/user.repository';
import { UserCheckService } from '../user/userCheck.service';
import { CreateNovelReviewInput } from './dto/createNovelReview.input';
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
    // 생성
    async createReivew(
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
}
