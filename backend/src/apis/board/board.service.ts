import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';
import { IPayload } from 'src/commons/interfaces/Payload.interface';

import { UserRepository } from '../user/entities/user.repository';
import { UserCheckService } from '../user/userCheck.service';

import { BoardEntity } from './entities/board.entity';
import { BoardRepository } from './entities/board.repository';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { FileRepository } from '../file/entities/file.repository';

@Injectable()
export class BoardService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly fileRepository: FileRepository,
        private readonly boardRepository: BoardRepository, //
        private readonly userCheckService: UserCheckService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /** 특정 게시글 조회 (단일) */
    async findOne(
        boardID: string, //
    ): Promise<BoardEntity> {
        return await this.boardRepository.findOneByBoard(boardID);
    }

    /* 특정 키워드로 게시글 조회 */
    async findTarget(
        keyword: string, //
    ): Promise<BoardEntity[]> {
        return await this.boardRepository.search(keyword);
    }

    /* 모든 게시글 조회 */
    async findAll(): Promise<BoardEntity[]> {
        return await this.boardRepository.findAll();
    }

    /* 유저가 작성한 게시글 조회 */
    async findBoard(
        currentUser: IPayload, //
    ): Promise<BoardEntity[]> {
        return await this.boardRepository.findByIDFromBoards(currentUser.id);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성

    async createBoard(
        userID: string,
        input: CreateBoardInput, //
    ): Promise<BoardEntity> {
        const { fileURLs, ...rest } = input;

        // 회원 검색
        const user = await this.userRepository.findOneByID(userID);
        this.userCheckService.checkValidUser(user);

        // 이미지 업로드
        const uploadFiles = await this.fileRepository.findBulkByUrl(fileURLs);

        // 게시글 생성
        return await this.boardRepository.save({
            user,
            files: uploadFiles,
            ...rest,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    async updateBoard(
        userID: string,
        input: UpdateBoardInput, //
    ): Promise<BoardEntity> {
        // 회원 검색
        const user = await this.userRepository.findOneByID(userID);
        this.userCheckService.checkValidUser(user);

        // 게시글 검색
        const board = await this.boardRepository.findOneByBoard(input.id);
        if (!board) {
            throw new ConflictException(
                MESSAGES.BOARD_FIND_ONE_FAILED, //
            );
        }

        // 수정
        return await this.boardRepository.save({
            ...board,
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        boardID: string, //
    ): Promise<boolean> {
        const result = await this.boardRepository.softDelete(boardID);
        return result ? true : false;
    }
}
