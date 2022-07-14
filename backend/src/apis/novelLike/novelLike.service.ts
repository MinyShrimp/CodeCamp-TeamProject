import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';

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
    ): Promise<boolean> {
        const check = await this.novelLikeRepository.checkValid(dto);
        if (!check) {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
        return true;
    }

    // 중복 체크
    async checkOverlap(
        dto: CreateNovelLikeDto, //
    ): Promise<boolean> {
        const check = await this.novelLikeRepository.checkOverlap(dto);
        if (check) {
            throw new ConflictException('이미 등록된 소설입니다.');
        }
        return true;
    }

    async create(
        dto: CreateNovelLikeDto, //
    ): Promise<NovelLikeEntity> {
        // 중복 체크
        await this.checkOverlap(dto);

        const to = await this.userService.checkValid(dto.userID);
        const from = await this.novelService.checkValid(dto.novelID);

        return await this.novelLikeRepository.save({
            user: to,
            novel: from,
        });
    }

    async delete(
        dto: DeleteNovelLikeDto, //
    ): Promise<boolean> {
        // 존재 체크
        await this.checkValid(dto);

        const result = await this.novelLikeRepository.delete(dto.novelLikeID);
        return result.affected ? true : false;
    }
}
