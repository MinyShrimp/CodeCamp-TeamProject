import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { CommentEntity } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/createComment.input';
import { UpdateCommentInput } from './dto/updateComment.input';
import { CommentRepository } from './entities/comment.repository';
import { FetchCommentOutput } from './dto/fetchComment.output';

@Resolver()
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService, //
        private readonly commentRepository: CommentRepository,
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

    ////////////////////////////////////////////////////////////////////////
    /** 보드ID로 해당 게시글의 댓글 조회  */
    @Query(
        () => FetchCommentOutput, //
        { description: '해당 게시글의 모든 댓글 조회' },
    )
    fetchCommentsFromBoard(
        @Args({ name: 'page', defaultValue: 1 }) page: number,
        @Args('boardID') boardID: string, //
    ): Promise<FetchCommentOutput> {
        return this.commentRepository.findByBoardIDFromComment(page, boardID);
    }

    ////////////////////////////////////////////////////////////////////////

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

    /** 특정 댓글 조회 (단일) */
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => CommentEntity, //
        { description: '특정 댓글 조회' },
    )
    fetchComment(
        @Args('commentID') commentID: string, //
    ): Promise<CommentEntity> {
        return this.commentService.find(commentID);
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
        @Args('boardID') boardID: string,
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
        () => ResultMessage, //
        { description: '댓글 삭제' },
    )
    async deleteComment(
        @Args('CommentID') commentID: string, //
    ): Promise<ResultMessage> {
        const result = await this.commentService.softDelete(commentID);
        return new ResultMessage({
            id: commentID,
            isSuccess: result,
            contents: result
                ? MESSAGES.COMMENT_SOFT_DELETE_SUCCESSED
                : MESSAGES.COMMENT_SOFT_DELETE_FAILED,
        });
    }
}
