import { ConflictException, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/commons/message/Message.enum';
import { NovelIndexService } from '../novelIndex/novelIndex.service';
import { UserService } from '../user/user.service';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { DeleteBookmarkDto } from './dto/deleteBookmark.dto';
import { BookmarkEntity } from './entities/bookmark.entity';

import { BookmarkRepository } from './entities/bookmark.repository';

@Injectable()
export class BookmarkService {
    constructor(
        private readonly bookmarkRepository: BookmarkRepository, //
        private readonly userService: UserService,
        private readonly novelIndexService: NovelIndexService,
    ) {}

    /** 북마크 여부 체크 */
    async checkValid(
        dto: DeleteBookmarkDto, //
    ): Promise<boolean> {
        const check = await this.bookmarkRepository.checkValid(dto);

        if (!check) {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
        return true;
    }

    /** 중복 체크 */
    async duplicateCheck(
        dto: CreateBookmarkDto, //
    ): Promise<boolean> {
        const check = await this.bookmarkRepository.duplicateCheck(dto);
        if (check) {
            throw new ConflictException('이미 북마크로 등록되었습니다.');
        }

        return true;
    }

    ///////////////////////////////////////////////////////////////////
    // 북마크 조회 //

    async findAll(): Promise<BookmarkEntity[]> {
        return await this.bookmarkRepository.findAll();
    }

    ///////////////////////////////////////////////////////////////////
    // 북마크 생성 //

    async create(
        dto: CreateBookmarkDto, //
    ): Promise<BookmarkEntity> {
        const { page } = dto;

        // 중복 체크
        await this.duplicateCheck(dto);

        const to = await this.userService.checkValid(dto.userID);
        const from = await this.novelIndexService.checkValid(dto.novelIndexID);

        return await this.bookmarkRepository.save({
            user: to,
            novelIndex: from,
            page,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 북마크 해제 //

    async delete(
        dto: DeleteBookmarkDto, //
    ): Promise<boolean> {
        await this.checkValid(dto);

        const result = await this.bookmarkRepository.delete(dto.bookmarkID);
        return result.affected ? true : false;
    }
}
