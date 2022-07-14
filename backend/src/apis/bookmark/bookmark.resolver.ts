import { Resolver } from '@nestjs/graphql';
import { BookmarkService } from './bookmark.service';
import { Args, Mutation } from '@nestjs/graphql';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { BookmarkEntity } from './entities/bookmark.entity';

@Resolver()
export class BookmarkResolver {
    constructor(
        private readonly bookmarkService: BookmarkService, //
    ) {}

    // 북마크 등록

    @Mutation(
        () => BookmarkEntity, //
        { description: '북마크 등록' },
    )
    create(
        @CurrentUser() currentUser: IPayload,
        @Args({
            name: 'novelIndexID', //
            description: '소설 인덱스 UUID',
        })
        novelIndexID: string, //
    ): Promise<BookmarkEntity> {
        return this.bookmarkService.create({
            userID: currentUser.id,
            novelIndexID: novelIndexID,
        });
    }
}
