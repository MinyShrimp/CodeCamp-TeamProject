import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';

import { UserService } from '../user/user.service';
import { NovelService } from '../novel/novel.service';

import { NovelIndexEntity } from './entities/novelIndex.entity';
import { NovelIndexRepository } from './entities/novelIndex.repository';
import { CreateNovelIndexInput } from './dto/createNovelIndex.input';
import { UpdateNovelIndexInput } from './dto/updateNovelIndex.input';

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
        userID: string, //
        novelIndexID: string,
    ): Promise<NovelIndexEntity> {
        const index = await this.indexRepository.getOnlyIDWithUser(
            userID,
            novelIndexID,
        );
        if (index === undefined) {
            throw new ConflictException(MESSAGES.NOVEL_INDEX_UNVALID);
        }
        return index;
    }

    /**
     * 존재 확인 ( 삭제 포함 )
     */
    async checkValidWithDeleted(
        userID: string, //
        novelIndexID: string,
    ): Promise<NovelIndexEntity> {
        const index = await this.indexRepository.getOnlyIDWithUserWithDeleted(
            userID,
            novelIndexID,
        );
        if (index === undefined) {
            throw new ConflictException(MESSAGES.NOVEL_INDEX_UNVALID);
        }
        return index;
    }

    /**
     * ID 기반 단일 조회
     */
    async findOne(
        userID: string,
        novelIndexID: string, //
    ): Promise<NovelIndexEntity> {
        // TODO: 구매 확인

        //
        return await this.indexRepository.getOne(novelIndexID);
    }

    /**
     * 생성
     */
    async create(
        userID: string,
        createInput: CreateNovelIndexInput, //
    ): Promise<NovelIndexEntity> {
        const { novelID, ...input } = createInput;

        // 회원 찾기
        const user = await this.userService.checkValid(userID);

        // 소설 찾기
        const novel = await this.novelService.checkValid(novelID);

        // 마지막 화 index 가져오기
        const index = await this.indexRepository.getLastIndex(userID, novelID);

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
        await this.checkValid(userID, input.id);

        const entity = await this.indexRepository.getOne(input.id);

        // 수정
        return await this.indexRepository.update({
            ...entity,
            ...input,
        });
    }

    /**
     * 삭제 취소
     */
    async restore(
        userID: string, //
        novelIndexID: string,
    ): Promise<boolean> {
        // 검사
        await this.checkValidWithDeleted(userID, novelIndexID);

        // 삭제 취소
        const result = await this.indexRepository.restore(novelIndexID);
        return result.affected ? true : false;
    }

    /**
     * 삭제 ( Soft )
     */
    async delete(
        userID: string, //
        novelIndexID: string,
    ): Promise<boolean> {
        // 검사
        await this.checkValid(userID, novelIndexID);

        // 삭제
        const result = await this.indexRepository.delete(novelIndexID);
        return result.affected ? true : false;
    }
}
