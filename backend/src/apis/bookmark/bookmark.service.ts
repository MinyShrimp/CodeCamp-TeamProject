import { ConflictException, Injectable } from '@nestjs/common';
import { NovelIndexService } from '../novelIndex/novelIndex.service';
import { UserService } from '../user/user.service';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { BookmarkEntity } from './entities/bookmark.entity';

import { BookmarkRepository } from './entities/bookmark.repository';

@Injectable()
export class BookmarkService {
    constructor(
        private readonly bookmarkRepository: BookmarkRepository, //
        private readonly userService: UserService,
        private readonly novelIndexService: NovelIndexService,
    ) {}

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
    // 생성 //

    async create(
        dto: CreateBookmarkDto, //
    ): Promise<BookmarkEntity> {
        // 중복 체크
        await this.duplicateCheck(dto);

        const to = await this.userService.checkValid(dto.userID);
        const from = await this.novelIndexService.checkValid(
            dto.userID,
            dto.novelIndexID,
        );

        return await this.bookmarkRepository.save({
            user: to,
            novelIndex: from,
        });
    }
}
