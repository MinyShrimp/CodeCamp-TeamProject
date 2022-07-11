import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';

import { UserService } from '../user/user.service';
import { NovelTagService } from '../novelTag/novelTag.service';
import { NovelCategoryService } from '../novelCategory/novelCategory.service';

import { NovelEntity } from './entities/novel.entity';
import { NovelRepository } from './entities/novel.repository';
import { CreateNovelInput } from './dto/createNovel.input';
import { UpdateNovelInput } from './dto/updateNovel.input';

@Injectable()
export class NovelService {
    constructor(
        private readonly userService: UserService,
        private readonly novelTagService: NovelTagService,
        private readonly novelCategoryService: NovelCategoryService,

        private readonly novelRepository: NovelRepository,
    ) {}

    /**
     * ID 기반 존재 여부 확인
     */
    async checkValid(
        novelID: string, //
    ): Promise<NovelEntity> {
        const novel = await this.novelRepository.getOnlyID(novelID);

        if (novel === undefined) {
            throw new ConflictException(MESSAGES.NOVEL_UNVALID);
        }

        return novel;
    }

    /**
     * 회원 ID + 소설 ID 기반
     * 존재 여부 확인
     */
    async checkValidWithUser(
        userID: string, //
        novelID: string,
    ): Promise<NovelEntity> {
        const index = await this.novelRepository.getOneWithUser(
            userID,
            novelID,
        );
        if (index === undefined) {
            throw new ConflictException(MESSAGES.NOVEL_UNVALID);
        }
        return index;
    }

    /**
     * 회원 ID + 소설 ID 기반
     * 존재 여부 확인 ( With Deleted )
     */
    async checkValidWithUserWithDeleted(
        userID: string, //
        novelID: string,
    ): Promise<NovelEntity> {
        const index = await this.novelRepository.getOneWithUserWithDeleted(
            userID,
            novelID,
        );
        if (index === undefined) {
            throw new ConflictException(MESSAGES.NOVEL_UNVALID);
        }
        return index;
    }

    /**
     * 생성
     */
    async create(
        userID: string,
        createNovelInput: CreateNovelInput, //
    ): Promise<NovelEntity> {
        const { categoryID, tags, ...input } = createNovelInput;

        // 유저 찾기
        const user = await this.userService.checkValid(userID);

        // 카테고리 찾기
        const category = await this.novelCategoryService.checkValid(categoryID);

        // 태그 찾기
        const tagEntities = await this.novelTagService.create(tags);

        // 저장
        return await this.novelRepository.save({
            user: user,
            novelCategory: category,
            novelTags: tagEntities,
            ...input,
        });
    }

    /**
     * 수정
     */
    async update(
        userID: string,
        updateNovelInput: UpdateNovelInput, //
    ): Promise<NovelEntity> {
        const { categoryID, tags, ...input } = updateNovelInput;

        // 검사
        await this.checkValidWithUser(userID, updateNovelInput.id);

        // 소설 찾기
        const novel = await this.novelRepository.getOne(updateNovelInput.id);

        // 카테고리 찾기
        const category =
            categoryID !== undefined
                ? await this.novelCategoryService.checkValid(categoryID)
                : novel.novelCategory;

        // 태그 찾기
        const tagEntities =
            tags !== undefined
                ? await this.novelTagService.create(tags)
                : novel.novelTags;

        // 수정
        return await this.novelRepository.update({
            ...novel,
            novelCategory: category,
            novelTags: tagEntities,
            ...input,
        });
    }

    /**
     * 삭제 취소
     *
     * 소설의 자식 테이블인
     * 소설_인덱스도 삭제 취소 함.
     */
    async restore(
        userID: string,
        novelID: string, //
    ): Promise<boolean> {
        // 검사
        await this.checkValidWithUserWithDeleted(userID, novelID);

        // 삭제
        const result = await this.novelRepository.restore(novelID);
        return result.affected ? true : false;
    }

    /**
     * 삭제 ( Soft )
     *
     * 소설의 자식 테이블인
     * 소설_인덱스도 삭제 함.
     */
    async delete(
        userID: string,
        novelID: string, //
    ): Promise<boolean> {
        // 검사
        await this.checkValidWithUser(userID, novelID);

        // 삭제
        const result = await this.novelRepository.delete(novelID);
        return result.affected ? true : false;
    }
}
