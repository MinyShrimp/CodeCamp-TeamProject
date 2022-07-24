import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { UserService } from '../user/user.service';
import { NovelIndexService } from '../novelIndex/novelIndex.service';

import { BookmarkEntity } from './entities/bookmark.entity';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { DeleteBookmarkDto } from './dto/deleteBookmark.dto';
import { BookmarkRepository } from './entities/bookmark.repository';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';

@Injectable()
export class BookmarkService {
    constructor(
        private readonly userService: UserService,
        private readonly bookmarkRepository: BookmarkRepository, //
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

    /** 북마크 등록 */
    async create(
        dto: CreateBookmarkDto, //
    ): Promise<BookmarkEntity> {
        // 중복 체크
        await this.bookmarkRepository.checkOverlap(dto);

        const to = await this.userService.checkValid(dto.userID);
        const from = await this.novelIndexService.checkValid(dto.novelIndexID);

        return await this.bookmarkRepository.save({
            user: to,
            novelIndex: from,
        });
    }

    /** 북마크 등록 취소 */
    async delete(
        dto: DeleteBookmarkDto, //
    ): Promise<boolean> {
        // 존재 체크
        const bookmark = await this.checkValid(dto);

        const result = await this.bookmarkRepository.delete(dto.bookmarkID);
        return result.affected ? true : false;
    }

    ///////////////////////////////////////////////////////////////////
    // 북마크 조회 //

    async findAll(): Promise<BookmarkEntity[]> {
        return await this.bookmarkRepository.findAll();
    }

    ///////////////////////////////////////////////////////////////////
    // 북마크 생성 및 해제 //

    async switch(
        dto: CreateBookmarkDto, //
    ): Promise<ResultMessage> {
        const check = await this.bookmarkRepository.checkOverlap(dto);

        if (check !== undefined) {
            // 있으면, 삭제
            const result = await this.delete({
                userID: dto.userID,
                bookmarkID: check.id,
            });

            return new ResultMessage({
                isSuccess: result ? true : false,
                contents: result ? '북마크 해제' : '북마크 등록',
            });
        } else {
            const result = await this.create(dto);

            return new ResultMessage({
                isSuccess: result ? true : false,
                contents: result ? '북마크 등록' : '북마크 해제',
            });
        }
    }

    // async switch(
    //     userID: string,
    //     dto: CreateBookmarkDto, //
    // ): Promise<boolean> {
    //     // 중복 체크
    //     const check = await this.bookmarkRepository.duplicateCheck(userID, dto);

    //     // 유효 UUID 체크
    //     const to = await this.userService.checkValid(userID);
    //     const from = await this.novelIndexService.checkValid(dto.novelIndexID);

    //     if (check === undefined) {
    //         const target = await this.bookmarkRepository.findOne(
    //             userID,
    //             dto.novelIndexID,
    //             dto.page,
    //         );

    //         if (!target) {
    //             await this.bookmarkRepository.save({
    //                 user: to,
    //                 novelIndex: from,
    //                 page: dto.page,
    //                 isBoolean: dto.isBoolean,
    //             });
    //         } else {
    //             await this.bookmarkRepository.restore(target.id);
    //             await this.bookmarkRepository.save({
    //                 id: target.id,
    //                 user: to,
    //                 novelIndex: from,
    //                 page: dto.page,
    //                 isBoolean: true,
    //             });
    //         }
    //         return true;
    //     } else if (check !== undefined) {
    //         const result = await this.bookmarkRepository.softdelete(
    //             dto.bookmarkID,
    //         );
    //         await this.bookmarkRepository.save({
    //             id: dto.bookmarkID,
    //             user: to,
    //             novelIndex: from,
    //             page: dto.page,
    //             isBoolean: false,
    //         });
    //         const isSuccess = result.affected ? false : true;

    //         return isSuccess;
    //     }
    // }
}
