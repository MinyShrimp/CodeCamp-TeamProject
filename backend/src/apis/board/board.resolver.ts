import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { BoardEntity } from './entities/board.entity';
import { BoardService } from './board.service';
import { BoardRepository } from './entities/board.repository';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';

/* 게시판 API */
@Resolver()
export class BoardResolver {
    constructor(
        private readonly boardService: BoardService, //
        private readonly boardRepository: BoardRepository,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    // 페이지네이션
    @Query(
        () => [BoardEntity], //
        { description: '게시판 목록 조회 ( page )' },
    )
    fetchBoardsPage(
        @Args({ name: 'page', type: () => Int, defaultValue: 1 }) page: number,
    ): Promise<Array<BoardEntity>> {
        return this.boardRepository.getPage(page);
    }

    // 게시글 전체 갯수 조회
    @Query(
        () => Int, //
        { description: '게시글 전체 갯수' },
    )
    fetchBoardAllCount(): Promise<number> {
        return this.boardRepository.getCount();
    }

    // 키워드로 조회
    @Query(
        () => [BoardEntity], //
        { description: '키워드로 게시글 조회' },
    )
    fetchTargetBoards(
        @Args('keyword') keyword: string,
    ): Promise<BoardEntity[]> {
        return this.boardService.findTarget(keyword);
    }

    // 게시글 전체 조회
    @Query(
        () => [BoardEntity], //
        { description: '게시글 전체 조회' },
    )
    fetchBoardsAll(): Promise<BoardEntity[]> {
        return this.boardService.findAll();
    }

    // 특정 게시글 조회 (단일)
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => BoardEntity, //
        { description: '특정 게시글 조회' },
    )
    fetchBoard(
        @Args('boardID') boardID: string, //
    ): Promise<BoardEntity> {
        return this.boardService.findOne(boardID);
    }

    // 유저가 쓴 게시글 조회
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [BoardEntity], //
        { description: '유저가 쓴 게시글 조회' },
    )
    fetchBoards(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<BoardEntity[]> {
        return this.boardService.findBoard(currentUser);
    }

    ///////////////////////////////////////////////////////////////////q
    // 생성 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => BoardEntity, //
        { description: '게시글 생성' },
    )
    async createBoard(
        @CurrentUser() currentUser: IPayload, //
        @Args('createBoardInput') input: CreateBoardInput, //
    ): Promise<BoardEntity> {
        return await this.boardService.createBoard(currentUser.id, input);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => BoardEntity, //
        { description: '게시글 수정' },
    )
    async updateBoard(
        @CurrentUser() currentUser: IPayload, //
        @Args('updateBoardInput') input: UpdateBoardInput, //
    ): Promise<BoardEntity> {
        return await this.boardService.updateBoard(currentUser.id, input);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String, //
        { description: '게시글 삭제' },
    )
    deleteBoard(
        @Args('BoardID') boardID: string, //
    ): Promise<string> {
        return this.boardService.softDelete(boardID);
    }
}
