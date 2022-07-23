import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { UserService } from '../user/user.service';
import { BoardService } from '../board/board.service';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { BoardRepository } from '../board/entities/board.repository';

import { BoardLikeEntity } from './entities/boardLike.entity';
import { CreateBoardLikeDto } from './dto/createBoardLike.dto';
import { DeleteBoardLikeDto } from './dto/deleteBoardLike.dto';
import { BoardLikeRepository } from './entities/boardLike.repository';

@Injectable()
export class BoardLikeService {
    constructor(
        private readonly boardLikeRepository: BoardLikeRepository, //
        private readonly boardRepository: BoardRepository,
        private readonly boardService: BoardService,
        private readonly userService: UserService,
    ) {}

    // 존재 체크
    async checkValid(
        dto: DeleteBoardLikeDto, //
    ): Promise<BoardLikeEntity> {
        const check = await this.boardLikeRepository.checkValid(dto);
        if (!check) {
            throw new ConflictException(MESSAGES.UNVLIAD_ACCESS);
        }
        return check;
    }

    // 중복 체크
    async checkOverlap(
        dto: CreateBoardLikeDto, //
    ): Promise<BoardLikeEntity> {
        const check = await this.boardLikeRepository.checkOverlap(dto);

        if (check) {
            throw new ConflictException('이미 등록됐습니다.');
        }
        return check;
    }

    // 댓글 좋아요 등록 및 취소
    async switch(
        dto: CreateBoardLikeDto, //
    ): Promise<ResultMessage> {
        // 중복체크
        const check = await this.boardLikeRepository.checkOverlap(dto);

        console.log('여기는 스위치=====', check);

        if (check) {
            // 체크 되어 있을 시 해제
            const result = await this.delete({
                userID: dto.userID,
                boardLikeID: check.id,
            });

            return new ResultMessage({
                isSuccess: result,
                contents: result
                    ? '게시글 좋아요 해제 성공'
                    : '게시글 좋아요 해제 실패',
            });
        } else {
            // 없으면 등록
            const result = await this.create(dto);

            return new ResultMessage({
                isSuccess: result ? true : false,
                contents: result
                    ? '게시글 좋아요 등록 성공'
                    : '게시글 좋아요 등록 실패',
            });
        }
    }

    // 생성(등록)
    async create(
        dto: CreateBoardLikeDto, //
    ): Promise<BoardLikeEntity> {
        // 중복 체크
        await this.checkOverlap(dto);

        const to = await this.userService.checkValid(dto.userID);
        await this.boardRepository.findOneByBoard(dto.boardID);

        // 좋아요 갯수 증가
        const from = await this.boardService.setLikeCount({
            ...dto,
            isUp: true,
        });

        return await this.boardLikeRepository.save({
            user: to,
            board: from,
        });
    }

    // 삭제
    async delete(
        dto: DeleteBoardLikeDto, //
    ): Promise<boolean> {
        // 존재 체크
        const boardLike = await this.checkValid(dto);

        // 좋아요 갯수 감소
        await this.boardService.setLikeCount({
            boardID: boardLike.boardID,
            userID: boardLike.userID,
            isUp: false,
        });

        const result = await this.boardLikeRepository.delete(
            dto.boardLikeID, //
        );
        return result.affected ? true : false;
    }
}
