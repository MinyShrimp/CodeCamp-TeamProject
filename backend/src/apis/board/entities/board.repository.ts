import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { BoardEntity } from './board.entity';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 조회
     */
    async findAll(): Promise<BoardEntity[]> {
        return await this.boardRepository.find({
            relations: ['user', 'comments'],
        });
    }

    /**
     * 유저 ID 기반 조회
     */
    async findByIDFromBoards(userID: string): Promise<BoardEntity[]> {
        return await this.boardRepository.find({
            relations: ['user', 'comments'],
            where: { user: userID },
        });
    }

    /**
     * boardID 기반 조회
     */
    async findOneByBoard(boardID: string): Promise<BoardEntity> {
        return await this.boardRepository.findOne({
            relations: ['user', 'comments'],
            where: { id: boardID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    create(
        entity: Partial<BoardEntity>, //
    ): BoardEntity {
        return this.boardRepository.create(entity);
    }

    async save(
        entity: Partial<BoardEntity>, //
    ): Promise<BoardEntity> {
        return await this.boardRepository.save(entity);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async softDelete(
        boardID: string, //
    ): Promise<UpdateResult> {
        return await this.boardRepository.softDelete(boardID);
    }
}
