import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';

import { UserRepository } from '../user/entities/user.repository';
import { BoardRepository } from '../board/entities/board.repository';

import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { CommentRepository } from './entities/comment.repository';
import { CreateCommentInput } from './dto/createComment.input';
import { UpdateCommentInput } from './dto/updateComment.input';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository, //
        private readonly boardRepository: BoardRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async setLikeCount(
        dto: CommentDto & { isUp: boolean },
    ): Promise<CommentEntity> {
        const comment = await this.commentRepository.getOneWithDeleted(
            dto.commentID,
        );
        if (dto.userID === comment.user.id) {
            throw new ConflictException(
                '본인의 글에 좋아요를 누를 수 없습니다.',
            );
        }
        return await this.commentRepository.update({
            ...comment,
            likeCount: comment.likeCount + 1 * (dto.isUp ? 1 : -1),
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     *  모든 댓글 조회
     */
    async findAll(): Promise<CommentEntity[]> {
        return await this.commentRepository.findAll();
    }

    /**
     * 특정 댓글 조회
     */
    async find(
        commentID: string, //
    ): Promise<CommentEntity> {
        return await this.commentRepository.findOneByComment(commentID);
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
        const { parentID, ...contents } = input;
        const user = await this.userRepository.findOneByID(userID);
        const board = await this.boardRepository.findOneByBoard(boardID);

        // 게시글이 존재하지 않을 시 에러
        if (!board || !user) {
            throw new ConflictException(
                MESSAGES.BOARD_FIND_ONE_FAILED, //
            );
        }

        // 부모ID 입력 여부로 댓글 과 대댓글 분류
        if (!parentID) {
            const cmt = this.commentRepository.create({
                user: user,
                board: board,
                contents: input.contents,
            });
            return await this.commentRepository.save(cmt);
        } else {
            const parent = await this.commentRepository.findOneByComment(
                parentID,
            );

            const cmt = this.commentRepository.create({
                user: user,
                board: board,
                parent: parent,
                contents: input.contents,
            });

            return await this.commentRepository.save(cmt);
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
            contents: input.contents,
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
