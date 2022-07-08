import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from '../../commons/message/Message.enum';

import { BoardEntity } from './entities/board.entity';
import { BoardRepository } from './entities/board.repository';
import { CreateBoardInput } from './dto/createBoardInput';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';

@Injectable({})
export class BoardService {
    constructor(
        private readonly boardRepository: BoardRepository, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /* 모든 게시글 조회 */
    find() {
        return this.boardRepository.findAll();
    }

    /* 유저가 작성한 게시글 조회 */
    async findBoard(currentUser) {
        return await this.boardRepository.findByIDFromBoards(currentUser.id);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성
    async createBoard(
        input: CreateBoardInput, //
    ): Promise<BoardEntity> {
        // 검색
        const user = await this.boardRepository.findOneByID(input.userId);

        // 유효 유저ID 확인
        const checkValidUser = (user) => {
            if (user === undefined) {
                throw new ConflictException(
                    MESSAGES.USER_FIND_ONE_FAILED, //
                );
            }
            return user;
        };
        checkValidUser(user);

        // 게시글 생성
        return await this.boardRepository.save(input);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //
    async updateBoard(
        updateInput: UpdateBoardInput, //
    ): Promise<BoardEntity> {
        const board = await this.boardRepository.findOneByBoard(
            updateInput.boardId,
        );
        const user = await this.boardRepository.findOneByID(updateInput.user);

        const checkValidUser = (board, user) => {
            if (!board || !user) {
                throw new ConflictException(
                    MESSAGES.BOARD_FIND_ONE_FAILED, //
                );
            }
            return board;
        };
        checkValidUser(board, user);

        return await this.boardRepository.save({
            ...board,
            ...updateInput,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
    async softDelete(
        boardID: string, //
    ) {
        const result = await this.boardRepository.softDelete(boardID);
        return result.affected
            ? MESSAGES.BOARD_SOFT_DELETE_SUCCESSED
            : MESSAGES.BOARD_SOFT_DELETE_FAILED;
    }
}
