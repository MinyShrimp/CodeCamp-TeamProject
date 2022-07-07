import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from 'src/apis/user/entities/user.entity';
import { BoardEntity } from './board.entity';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>, //

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 검증 //
    /* userId 기반 조회 */
    async findOneByID(userID: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { id: userID },
        });
    }

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
}
