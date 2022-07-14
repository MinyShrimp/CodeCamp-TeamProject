import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';

import { UserService } from '../user/user.service';
import { NovelService } from '../novel/novel.service';

import { CreateNovelDonateDto } from './dto/createNovelDonate.dto';
import { DeleteNovelDonateDto } from './dto/deleteNovelDonate.dto';

import { NovelDonateEntity } from './entities/novelDonate.entity';
import { NovelDonateRepository } from './entities/novelDonate.repository';

@Injectable()
export class NovelDonateService {
    constructor(
        private readonly userService: UserService,
        private readonly novelService: NovelService,
        private readonly novelDonateRepository: NovelDonateRepository,
    ) {}

    // 존재 체크
    async checkValid(
        dto: DeleteNovelDonateDto, //
    ): Promise<boolean> {
        const check = await this.novelDonateRepository.checkValid(dto);
        if (!check) {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
        return true;
    }

    // 중복 체크
    async checkOverlap(
        dto: CreateNovelDonateDto, //
    ): Promise<boolean> {
        const check = await this.novelDonateRepository.checkOverlap(dto);
        if (check) {
            throw new ConflictException('이미 등록된 소설입니다.');
        }
        return true;
    }

    async create(
        dto: CreateNovelDonateDto, //
    ): Promise<NovelDonateEntity> {
        // 중복 체크
        await this.checkOverlap(dto);

        const to = await this.userService.checkValid(dto.userID);
        const from = await this.novelService.checkValid(dto.novelID);

        return await this.novelDonateRepository.save({
            user: to,
            novel: from,
        });
    }

    async delete(
        dto: DeleteNovelDonateDto, //
    ): Promise<boolean> {
        // 존재 체크
        await this.checkValid(dto);

        const result = await this.novelDonateRepository.delete(
            dto.novelDonateID,
        );
        return result.affected ? true : false;
    }
}
