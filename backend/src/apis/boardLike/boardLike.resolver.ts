import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { BoardLikeEntity } from './entities/boardLike.entity';
import { BoardLikeService } from './boardLike.service';
import { BoardLikeRepository } from './entities/boardLike.repository';

@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class BoardLikeResolver {
    constructor(
        private readonly boardLikeService: BoardLikeService, //
        private readonly boardLikeRepository: BoardLikeRepository,
    ) {}

    // 게시글 좋아요 조회
    @Query(
        () => [BoardLikeEntity], //
        { description: '게시글 좋아요 조회' },
    )
    async fetchBoardLikeUser(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<BoardLikeEntity[]> {
        return await this.boardLikeRepository.findList(currentUser.id);
    }

    // 게시글 좋아요 등록 및 해제
    @Mutation(() => ResultMessage, {
        description: '게시글 좋아요 등록 및 해제',
    })
    async switchBoardLike(
        @CurrentUser() currentUser: IPayload, //
        @Args({
            name: 'boardID', //
            description: '게시글 UUID',
        })
        boardID: string,
    ) {
        return await this.boardLikeService.switch({
            userID: currentUser.id,
            boardID: boardID,
        });
    }
}
