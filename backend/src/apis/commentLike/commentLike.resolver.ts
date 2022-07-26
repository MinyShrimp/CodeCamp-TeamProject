import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { CommentLikeEntity } from './entities/commentLike.entity';
import { CommentLikeService } from './commentLike.service';
import { CommentLikeRepository } from './entities/commentLike.repository';

@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class CommentLikeResolver {
    constructor(
        private readonly commentLikeService: CommentLikeService, //
        private readonly commentLikeRepository: CommentLikeRepository,
    ) {}

    // 댓글 좋아요 조회
    @Query(
        () => [CommentLikeEntity], //
        { description: '댓글 좋아요 조회' },
    )
    async fetchCommentLikeUser(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<CommentLikeEntity[]> {
        return await this.commentLikeRepository.findList(currentUser.id);
    }

    // 댓글 좋아요 등록 및 해제
    @Mutation(
        () => ResultMessage,
        { description: '댓글 좋아요 등록 및 해제' }, //
    )
    async switchCommentLike(
        @CurrentUser() currentUser: IPayload, //
        @Args({
            name: 'commentID', //
            description: '댓글 UUID',
        })
        commentID: string,
    ) {
        return await this.commentLikeService.switch({
            userID: currentUser.id,
            commentID: commentID,
        });
    }
}
