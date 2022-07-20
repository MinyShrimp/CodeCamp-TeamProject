import { EntityManager } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';

import { UserRepository } from '../user/entities/user.repository';
import { BoardRepository } from '../board/entities/board.repository';

import { CommentEntity } from './entities/comment.entity';
import { CommentRepository } from './entities/comment.repository';
import { CreateCommentInput } from './dto/createComment.input';
import { UpdateCommentInput } from './dto/updateComment.input';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository, //
        private readonly boardRepository: BoardRepository,
        private readonly userRepository: UserRepository,

        @InjectEntityManager()
        private readonly manager: EntityManager,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     *  모든 댓글 조회
     */
    async findAll(): Promise<CommentEntity[]> {
        const manager = this.manager.getTreeRepository(CommentEntity);
        return await manager.findTrees();
    }

    /**
     *  해당 게시글의 모든 댓글 조회
     */
    // async findCommentsFromBoard(
    //     boardID: string, //
    // ): Promise<CommentEntity[]> {
    //     return await this.commentRepository.findByBoardIDFromComment(boardID);
    // }

    /**
     * 특정 댓글 조회
     */
    async find(
        commentID: string, //
    ): Promise<CommentEntity> {
        return await this.commentRepository.findOneByCommentOnlyOne(commentID);
    }

    /**
     *  유저 본인이 작성한 댓글 전체 조회
     */
    async findComments(
        userID: IPayload, //
    ): Promise<CommentEntity[]> {
        return await this.commentRepository.findByIDFromComments(userID.id);
    }

    ///////////////////////////////////////////////////////////////////
    /** 댓글 생성 */

    async createComment(
        userID: string,
        boardID: string,
        input: CreateCommentInput, //
    ): Promise<CommentEntity> {
        const { parent, children, ...contents } = input;
        const user = await this.userRepository.findOneByID(userID);
        const board = await this.boardRepository.findOneByBoard(boardID);
        const manager = this.manager.getTreeRepository(CommentEntity);

        console.log(input);

        // 게시글이 존재하지 않을 시 에러
        if (board === undefined || board === null) {
            throw new ConflictException(
                MESSAGES.BOARD_FIND_ONE_FAILED, //
            );
        }

        // 부모ID 입력 여부로 댓글 과 대댓글 분류
        if (!input.parent) {
            return await this.commentRepository.save({
                user,
                board,
                ...contents,
            });
        } else {
            const parent = await manager.findOne({
                where: { id: input.parent },
            });
            return await this.commentRepository.save({
                board,
                user,
                ...input,
                parent,
                children,
            });
        }
    }

    ///////////////////////////////////////////////////////////////////
    /** 댓글 수정 */

    async updateComment(
        input: UpdateCommentInput, //
    ): Promise<CommentEntity> {
        const comment = await this.commentRepository.findOneByComment(input.id);
        if (!comment) {
            throw new ConflictException(
                MESSAGES.COMMENT_UPDATE_FAILED, //
            );
        }

        return await this.commentRepository.save({
            ...comment,
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    /** 댓글 삭제 */

    async softDelete(
        commentID: string, //
    ): Promise<boolean> {
        const result = await this.commentRepository.softDelete(commentID);
        return result.affected ? true : false;
    }
}
