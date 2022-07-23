import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { UserService } from '../user/user.service';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { CommentService } from '../comment/comment.service';
import { CommentRepository } from '../comment/entities/comment.repository';

import { CommentLikeEntity } from './entities/commentLike.entity';
import { CreateCommentLikeDto } from './dto/createCommentLike.dto';
import { DeleteCommentLikeDto } from './dto/deleteCommentLike.dto';
import { CommentLikeRepository } from './entities/commentLike.repository';

@Injectable()
export class CommentLikeService {
    constructor(
        private readonly userService: UserService,
        private readonly commentService: CommentService,
        private readonly commentRepository: CommentRepository,
        private readonly commentLikeRepository: CommentLikeRepository, //
    ) {}

    // 존재 체크
    async checkValid(
        dto: DeleteCommentLikeDto, //
    ): Promise<CommentLikeEntity> {
        const check = await this.commentLikeRepository.checkValid(dto);
        if (!check) {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
        return check;
    }

    // 중복 체크
    async checkOverlap(
        dto: CreateCommentLikeDto, //
    ): Promise<CommentLikeEntity> {
        const check = await this.commentLikeRepository.checkOverlap(dto);
        if (check) {
            throw new ConflictException('이미 등록됐습니다.');
        }
        return check;
    }

    // 댓글 좋아요 등록 및 취소
    async switch(
        dto: CreateCommentLikeDto, //
    ): Promise<ResultMessage> {
        const check = await this.commentLikeRepository.checkOverlap(dto);

        if (check) {
            // 체크 되어 있을 시 해제
            const result = await this.delete({
                userID: dto.userID,
                commentLikeID: check.id,
            });

            return new ResultMessage({
                isSuccess: result,
                contents: result
                    ? '댓글 좋아요 해제 성공'
                    : '댓글 좋아요 해제 실패',
            });
        } else {
            // 없으면 등록
            const result = await this.create(dto);

            return new ResultMessage({
                isSuccess: result ? true : false,
                contents: result
                    ? '댓글 좋아요 등록 성공'
                    : '댓글 좋아요 등록 실패',
            });
        }
    }

    // 생성(등록)
    async create(
        dto: CreateCommentLikeDto, //
    ): Promise<CommentLikeEntity> {
        // 중복 체크
        await this.checkOverlap(dto);

        const to = await this.userService.checkValid(dto.userID);
        await this.commentRepository.findOneByComment(dto.commentID);

        // 좋아요 갯수 증가
        const from = await this.commentService.setLikeCount({
            ...dto,
            isUp: true,
        });

        return await this.commentLikeRepository.save({
            user: to,
            comment: from,
        });
    }

    // 삭제
    async delete(
        dto: DeleteCommentLikeDto, //
    ): Promise<boolean> {
        // 존재 체크
        const commentLike = await this.checkValid(dto);

        // 좋아요 갯수 감소
        await this.commentService.setLikeCount({
            commentID: commentLike.commentID,
            userID: commentLike.userID,
            isUp: false,
        });

        const result = await this.commentLikeRepository.delete(
            dto.commentLikeID,
        );
        return result.affected ? true : false;
    }
}
