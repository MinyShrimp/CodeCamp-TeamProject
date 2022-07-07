import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BoardService } from './board.service';

import { BoardEntity } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoardInput';
import { UpdateBoardInput } from './dto/updateBoard.input';

/* 게시판 API */
@Resolver({})
export class BoardResolver {
    constructor(
        private readonly boardService: BoardService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //
    @Query(() => String)
    aaa() {
        return 'aaa';
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //
    @Mutation(
        () => BoardEntity, //
        { description: '게시글 생성' },
    )
    async createBoard(
        @Args('createBoardInput') input: CreateBoardInput, //
    ) {
        return await this.boardService.createBoard(input);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //
    @Mutation(
        () => BoardEntity, //
        { description: '게시글 수정' },
    )
    async updateBoard(
        @Args('updateInput') updateInput: UpdateBoardInput, //
    ) {
        return await this.boardService.updateBoard(updateInput);
    }
}
