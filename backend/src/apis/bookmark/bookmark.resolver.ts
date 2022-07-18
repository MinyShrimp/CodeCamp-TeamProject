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
import { isBoolean } from 'class-validator';
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
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => BookmarkEntity, //
        { description: '북마크 등록 및 해제' },
    )
    async toggleBookmark(
        @CurrentUser() currentUser: IPayload, //
        @Args('createBookmarkInput') dto: CreateBookmarkDto,
    ): Promise<BookmarkEntity> {
        return await this.bookmarkService.switch(currentUser.id, dto);
    }
}
