import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { CommentEntity } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/createComment.input';
import { UpdateCommentInput } from './dto/updateComment.input';

@Resolver()
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /* 해당 게시글의 모든 댓글 조회 */
    @Query(
        () => [CommentEntity], //
        { description: '모든 댓글 조회 ' },
    )
    fetchCommentsAll(): Promise<CommentEntity[]> {
        return this.commentService.findAll();
    }

    /* 유저가 쓴 댓글 조회 */
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [CommentEntity], //
        { description: '유저가 쓴 댓글 조회' },
    )
    fetchComments(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<CommentEntity[]> {
        return this.commentService.findComments(currentUser);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => CommentEntity, //
        { description: '댓글 생성' },
    )
    async createComment(
        @CurrentUser() currentUser: IPayload, //
        @Args('board') boardID: string,
        @Args('createCommentInput') createInput: CreateCommentInput,
    ): Promise<CommentEntity> {
        return await this.commentService.createComment(
            currentUser.id, //
            boardID,
            createInput,
        );
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => CommentEntity, //
        { description: '댓글 수정' },
    )
    async updateComment(
        @Args('updateCommentInput') input: UpdateCommentInput,
    ): Promise<CommentEntity> {
        return await this.commentService.updateComment(input);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String, //
        { description: '댓글 삭제' },
    )
    deleteComment(
        @Args('CommentID') commentID: string, //
    ): Promise<string> {
        return this.commentService.softDelete(commentID);
    }
}
