import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';

import { UserService } from '../user/user.service';
import { NovelService } from '../novel/novel.service';

import { CreateNovelLikeDto } from './dto/createNovelLike.dto';
import { DeleteNovelLikeDto } from './dto/deleteNovelLike.dto';

import { NovelLikeEntity } from './entities/novelLike.entity';
import { NovelLikeRepository } from './entities/novelLike.repository';

@Injectable()
export class NovelLikeService {
    constructor(
        private readonly userService: UserService,
        private readonly novelService: NovelService,
        private readonly novelLikeRepository: NovelLikeRepository,
    ) {}

    // 존재 체크
    async checkValid(
        dto: DeleteNovelLikeDto, //
    ): Promise<NovelLikeEntity> {
        const check = await this.novelLikeRepository.checkValid(dto);
        if (!check) {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
        return check;
    }

    // 중복 체크
    async checkOverlap(
        dto: CreateNovelLikeDto, //
    ): Promise<NovelLikeEntity> {
        const check = await this.novelLikeRepository.checkOverlap(dto);
        if (check) {
            throw new ConflictException('이미 등록된 소설입니다.');
        }
        return check;
    }

    // 선호작 등록, 취소
    async switch(
        dto: CreateNovelLikeDto, //
    ): Promise<ResultMessage> {
        const check = await this.novelLikeRepository.checkOverlap(dto);
        if (check) {
            // 있으면, 삭제
            const result = await this.delete({
                userID: dto.userID,
                novelLikeID: check.id,
            });

            return new ResultMessage({
                isSuccess: result,
                contents: result
                    ? '선호작 등록 취소 성공'
                    : '선호작 등록 취소 실패',
            });
        } else {
            // 없으면, 만들기
            const result = await this.create(dto);

            return new ResultMessage({
                isSuccess: result ? true : false,
                contents: result ? '선호작 등록 성공' : '선호작 등록 실패',
            });
        }
    }

    // 선호작 등록
    async create(
        dto: CreateNovelLikeDto, //
    ): Promise<NovelLikeEntity> {
        // 중복 체크
        await this.checkOverlap(dto);

        const to = await this.userService.checkValid(dto.userID);
        await this.novelService.checkValid(dto.novelID);

        // 좋아요 갯수 증가
        const from = await this.novelService.setLikeCount({
            ...dto,
            isUp: true,
        });

        return await this.novelLikeRepository.save({
            user: to,
            novel: from,
        });
    }

    // 선호작 등록 취소
    async delete(
        dto: DeleteNovelLikeDto, //
    ): Promise<boolean> {
        // 존재 체크
        const novelLike = await this.checkValid(dto);

        // 좋아요 갯수 감소
        await this.novelService.setLikeCount({
            novelID: novelLike.novelID,
            userID: novelLike.userID,
            isUp: false,
        });

        const result = await this.novelLikeRepository.delete(dto.novelLikeID);
        return result.affected ? true : false;
    }
}
