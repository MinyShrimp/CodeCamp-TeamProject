import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from '../../commons/auth/gql-auth.guard';

import { BoardEntity } from './entities/board.entity';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoardInput';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';

/* 게시판 API */
@Resolver({})
export class BoardResolver {
    constructor(
        private readonly boardService: BoardService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //
    @Query(() => [BoardEntity])
    fetchBoardsAll() {
        return this.boardService.find();
    }

    // 전체 게시글 조회

    // 유저가 쓴 게시글 조회
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => [BoardEntity], //
        { description: '유저가 쓴 게시글 조회' },
    )
    fetchBoards(
        @CurrentUser() currentUser: IPayload, //
    ) {
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
        @CurrentUser() currentUser: any, //
        @Args('createBoardInput') input: CreateBoardInput, //
    ) {
        return await this.boardService.createBoard(input);
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
        @Args('updateInput') updateInput: UpdateBoardInput, //
    ) {
        return await this.boardService.updateBoard(updateInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => String, //
        { description: '게시글 삭제' },
    )
    deleteBoard(@Args('BoardID') boardID: string) {
        return this.boardService.softDelete(boardID);
    }
}
