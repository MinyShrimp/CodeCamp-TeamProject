import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from 'src/apis/user/entities/user.entity';
import { BoardEntity } from './board.entity';
import { getNowDate } from 'src/commons/utils/date.util';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>, //

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /* 전체 조회 - 게시글 */
    async findAll(): Promise<BoardEntity[]> {
        return await this.boardRepository.find({});
    }

    /* userID 기반 조회 */
    async findOneByID(userID: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            relations: ['user'],
            where: { id: userID },
        });
    }

    async findByIDFromBoards(userID: string): Promise<BoardEntity[]> {
        return await this.boardRepository.find({
            relations: ['user'],
            where: { user: userID },
        });
    }

    /* boardID 기반 조회 */
    async findOneByBoard(boardID: string): Promise<BoardEntity> {
        return await this.boardRepository.findOne({
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
    ) {
        return await this.boardRepository.update(
            { id: boardID },
            {
                deleteAt: getNowDate(),
            },
        );
    }
}
