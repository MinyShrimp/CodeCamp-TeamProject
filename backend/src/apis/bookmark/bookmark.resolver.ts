import { UseGuards } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { Query, Resolver } from '@nestjs/graphql';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { BookmarkEntity } from './entities/bookmark.entity';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/createBookmark.dto';

@Resolver()
export class BookmarkResolver {
    constructor(
        private readonly bookmarkService: BookmarkService, //
    ) {}

    // 북마크 조회
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [BookmarkEntity], //
        { description: '북마크 목록 조회' },
    )
    async fetchBookmarksInUser(): Promise<BookmarkEntity[]> {
        return await this.bookmarkService.findAll();
    }

    // 북마크 등록 및 해제
    // @UseGuards(GqlJwtAccessGuard)
    // @Mutation(
    //     () => ResultMessage, //
    //     { description: '북마크 등록 및 해제' },
    // )
    // async toggleBookmark(
    //     @CurrentUser() currentUser: IPayload, //
    //     @Args('createBookmarkInput') dto: CreateBookmarkDto,
    // ): Promise<ResultMessage> {
    //     const result = await this.bookmarkService.switch(currentUser.id, dto);
    //     return new ResultMessage({
    //         isSuccess: result,
    //         contents: result
    //             ? MESSAGES.BOOKMARK_SUCCESSED
    //             : MESSAGES.BOOKMARK_CANCEL,
    //     });
    // }

    // 북마크 등록
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage,
        { description: '북마크 등록 및 해제' }, //
    )
    async switchBookmark(
        @CurrentUser() currentUser: IPayload,
        @Args({
            name: 'novelIndexID', //
            description: '소설 인덱스 UUID',
        })
        novelIndexID: string, //

        @Args({
            name: 'page', //
            description: '북마크 페이지',
        })
        page: number,
    ): Promise<ResultMessage> {
        return await this.bookmarkService.switch({
            userID: currentUser.id,
            novelIndexID: novelIndexID,
            page,
        });
    }
}
