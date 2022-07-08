import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { BoardEntity } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';

import { BoardService } from './board.service';

/* 게시판 API */
@Resolver()
export class BoardResolver {
    constructor(
        private readonly boardService: BoardService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    // 게시글 전체 조회
    @Query(
        () => [BoardEntity], //
        { description: '게시글 전체 조회' },
    )
    fetchBoardsAll(): Promise<BoardEntity[]> {
        return this.boardService.findAll();
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

    ///////////////////////////////////////////////////////////////////
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