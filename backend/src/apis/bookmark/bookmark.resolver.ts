import { Query, Resolver } from '@nestjs/graphql';
import { BookmarkService } from './bookmark.service';
import { Args, Mutation } from '@nestjs/graphql';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { BookmarkEntity } from './entities/bookmark.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { MESSAGES } from 'src/commons/message/Message.enum';

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

    // 북마크 등록
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => BookmarkEntity, //
        { description: '북마크 등록' },
    )
    createBookmark(
        @CurrentUser() currentUser: IPayload,
        @Args({
            name: 'novelIndexID', //
            description: '소설 인덱스 UUID',
        })
        novelIndexID: string, //
        @Args({
            name: 'page', //
            description: '페이지 정보',
        })
        page: number,
    ): Promise<BookmarkEntity> {
        return this.bookmarkService.create({
            userID: currentUser.id,
            novelIndexID: novelIndexID,
            page,
        });
    }

    // 북마크 해제

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage,
        { description: '북마크 해제' }, //
    )
    async deleteBookmark(
        @CurrentUser() currentUser: IPayload, //
        @Args({
            name: 'bookmarkID', //
            description: '북마크 Entity UUID',
        })
        bookmarkID: string, //
    ): Promise<ResultMessage> {
        const result = await this.bookmarkService.delete({
            userID: currentUser.id,
            bookmarkID: bookmarkID,
        });

        return new ResultMessage({
            id: bookmarkID,
            isSuccess: result,
            contents: result ? MESSAGES.DELETE_SUCCESS : MESSAGES.DELETE_FAILED,
        });
    }
}
