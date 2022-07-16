import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';

import { UserService } from '../user/user.service';
import { NovelService } from '../novel/novel.service';

import { NovelIndexEntity } from './entities/novelIndex.entity';
import { NovelIndexRepository } from './entities/novelIndex.repository';
import { CreateNovelIndexInput } from './dto/createNovelIndex.input';
import { UpdateNovelIndexInput } from './dto/updateNovelIndex.input';
import { NovelIndexDto } from './dto/novelIndex.dto';

@Injectable()
export class NovelIndexService {
    constructor(
        private readonly userService: UserService,
        private readonly novelService: NovelService,
        private readonly indexRepository: NovelIndexRepository,
    ) {}

    /**
     * 존재 확인
     */
    async checkValid(
        novelIndexID: string, //
    ): Promise<NovelIndexEntity> {
        const index = await this.indexRepository.getOnlyID(novelIndexID);
        if (index === undefined) {
            throw new ConflictException(MESSAGES.NOVEL_INDEX_UNVALID);
        }
        return index;
    }

    /**
     * 존재 확인
     */
    async checkValidWithUser(
        dto: NovelIndexDto, //
    ): Promise<NovelIndexEntity> {
        const index = await this.indexRepository.getOnlyIDWithUser(dto);
        if (index === undefined) {
            throw new ConflictException(MESSAGES.NOVEL_INDEX_UNVALID);
        }
        return index;
    }

    /**
     * 존재 확인 ( 삭제 포함 )
     */
    async checkValidWithDeleted(
        dto: NovelIndexDto, //
    ): Promise<NovelIndexEntity> {
        const index = await this.indexRepository.getOnlyIDWithUserWithDeleted(
            dto,
        );
        if (index === undefined) {
            throw new ConflictException(MESSAGES.NOVEL_INDEX_UNVALID);
        }
        return index;
    }

    /**
     * ID 기반 단일 조회
     */
    async findOne(dto: NovelIndexDto): Promise<NovelIndexEntity> {
        // TODO: 구매 확인

        // 조회수 1 증가
        await this.indexRepository.view(dto);

        // 조회
        return await this.indexRepository.getOne(dto.novelIndexID);
    }

    /**
     * 생성
     */
    async create(
        userID: string,
        createInput: CreateNovelIndexInput, //
    ): Promise<NovelIndexEntity> {
        const { novelID, ...input } = createInput;

        // 검사
        await this.novelService.checkValidWithUser(userID, novelID);

        // 회원 찾기
        const user = await this.userService.checkValid(userID);

        // 소설 찾기
        const novel = await this.novelService.checkValid(novelID);

        // 마지막 화 index 가져오기
        const index = await this.indexRepository.getLastIndex({
            userID: userID,
            novelID: novelID,
        });

        // 저장
        return await this.indexRepository.save({
            user: user,
            novel: novel,
            index: index,
            ...input,
        });
    }

    /**
     * 수정
     */
    async update(
        userID: string,
        input: UpdateNovelIndexInput, //
    ): Promise<NovelIndexEntity> {
        // 검사
        await this.checkValidWithUser({
            userID: userID,
            novelIndexID: input.id,
        });

        const entity = await this.indexRepository.getOne(input.id);

        // 수정
        return await this.indexRepository.update({
            ...entity,
            ...input,
        });
    }

    /**
     * 비공개 전환 ( switch )
     */
    async changePrivate(
        dto: NovelIndexDto, //
    ): Promise<NovelIndexEntity> {
        // 검사
        await this.checkValidWithUser(dto);

        const entity = await this.indexRepository.getOne(dto.novelIndexID);

        return await this.indexRepository.update({
            ...entity,
            isPrivate: !entity.isPrivate,
        });
    }

    /**
     * 삭제 취소
     */
    async restore(
        dto: NovelIndexDto, //
    ): Promise<boolean> {
        // 검사
        await this.checkValidWithDeleted(dto);

        // 삭제 취소
        const result = await this.indexRepository.restore(dto.novelIndexID);
        return result.affected ? true : false;
    }

    /**
     * 삭제 ( Soft )
     */
    async delete(
        dto: NovelIndexDto, //
    ): Promise<boolean> {
        // 검사
        await this.checkValidWithUser(dto);

        // 삭제
        const result = await this.indexRepository.delete(dto.novelIndexID);
        return result.affected ? true : false;
    }
}
