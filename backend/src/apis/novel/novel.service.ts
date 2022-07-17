import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';

import { FileRepository } from '../file/entities/file.repository';

import { UserService } from '../user/user.service';
import { NovelTagService } from '../novelTag/novelTag.service';
import { NovelCategoryService } from '../novelCategory/novelCategory.service';

import { NovelEntity } from './entities/novel.entity';
import { NovelRepository } from './entities/novel.repository';
import { CreateNovelInput } from './dto/createNovel.input';
import { UpdateNovelInput } from './dto/updateNovel.input';
import { IPayload } from 'src/commons/interfaces/Payload.interface';

@Injectable()
export class NovelService {
    constructor(
        private readonly fileRepository: FileRepository,
        private readonly userService: UserService,
        private readonly novelTagService: NovelTagService,
        private readonly novelCategoryService: NovelCategoryService,

        private readonly novelRepository: NovelRepository,
    ) {}

    private readonly logger = new Logger('Novel');

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
     * 연재 주기 검사
     */
    private getCycle(cycles: number[]) {
        const cycle = cycles.join('|');
        if (cycles.length === 0) {
            throw new ConflictException('연재 주기 값을 확인해주세요.');
        }
        if (cycle.includes('0')) {
            if (cycles.length !== 1) {
                throw new ConflictException('연재 주기 값을 확인해주세요.');
            }
        }
        return cycle;
    }

    /**
     * 생성
     */
    async create(
        payload: IPayload,
        createNovelInput: CreateNovelInput, //
    ): Promise<NovelEntity> {
        const { categoryID, tags, fileURLs, cycles, ...input } =
            createNovelInput;

        // 유저 찾기
        const user = await this.userService.checkValid(payload.id);

        // 카테고리 찾기
        const category = await this.novelCategoryService.checkValid(categoryID);

        // 태그 찾기
        const tagEntities = await this.novelTagService.create(tags);

        // 이미지 업로드
        const uploadFiles = await this.fileRepository.findBulkByUrl(fileURLs);

        // 연재 주기
        const cycle = this.getCycle(cycles);

        // 저장
        const result = await this.novelRepository.save({
            user: user,
            novelCategory: category,
            novelTags: tagEntities,
            files: uploadFiles,
            cycle: cycle,
            ...input,
        });

        // Logging
        this.logger.log(`[Create] ${payload.nickName} - ${result.id}`);

        return result;
    }

    /**
     * 수정
     */
    async update(
        payload: IPayload,
        updateNovelInput: UpdateNovelInput, //
    ): Promise<NovelEntity> {
        const { categoryID, tags, fileURLs, cycles, ...input } =
            updateNovelInput;

        // 검사
        await this.checkValidWithUser(payload.id, updateNovelInput.id);

        // 소설 찾기
        const novel = await this.novelRepository.getOnlyID(updateNovelInput.id);

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

        // 이미지 업로드
        const uploadFiles =
            fileURLs !== undefined
                ? await this.fileRepository.findBulkByUrl(fileURLs)
                : novel.files;

        // 연재 주기
        const cycle =
            cycles !== undefined ? this.getCycle(cycles) : novel.cycle;

        // 수정
        const result = await this.novelRepository.update({
            ...novel,
            novelCategory: category,
            novelTags: tagEntities,
            files: uploadFiles,
            cycle: cycle,
            ...input,
        });

        // Logging
        this.logger.log(`[Update] ${payload.nickName} - ${result.id}`);

        return result;
    }

    /**
     * 삭제 취소
     *
     * 소설의 자식 테이블인
     * 소설_인덱스도 삭제 취소 함.
     */
    async restore(
        payload: IPayload,
        novelID: string, //
    ): Promise<boolean> {
        // 검사
        await this.checkValidWithUserWithDeleted(payload.id, novelID);

        // 삭제
        const result = await this.novelRepository.restore(novelID);
        const isSuccess = result.affected ? true : false;

        // Logging
        this.logger.log(
            `[Restore] ${payload.nickName} - ${novelID} - ${isSuccess}`,
        );

        return isSuccess;
    }

    /**
     * 삭제 ( Soft )
     *
     * 소설의 자식 테이블인
     * 소설_인덱스도 삭제 함.
     */
    async delete(
        payload: IPayload,
        novelID: string, //
    ): Promise<boolean> {
        // 검사
        await this.checkValidWithUser(payload.id, novelID);

        // 삭제
        const result = await this.novelRepository.delete(novelID);
        const isSuccess = result.affected ? true : false;

        // Logging
        this.logger.log(
            `[Soft Delete] ${payload.nickName} - ${novelID} - ${isSuccess}`,
        );

        return isSuccess;
    }
}
