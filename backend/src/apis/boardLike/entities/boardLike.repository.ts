import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { BoardLikeEntity } from './boardLike.entity';
import { CreateBoardLikeDto } from '../dto/createBoardLike.dto';
import { DeleteBoardLikeDto } from '../dto/deleteBoardLike.dto';

@Injectable()
export class BoardLikeRepository {
    constructor(
        @InjectRepository(BoardLikeEntity)
        private readonly boardLikeRepository: Repository<BoardLikeEntity>,
    ) {}

    /** 유저ID로 조회 */
    async findList(
        userID: string, //
    ): Promise<BoardLikeEntity[]> {
        return await this.boardLikeRepository
            .createQueryBuilder('bl')
            .leftJoinAndSelect('bl.board', 'BoardEntity')
            .leftJoinAndSelect('bl.user', 'UserEntity')
            .leftJoinAndSelect('UserEntity.userClass', 'UserClassEntity')
            .where('bl.userID=:userID', { userID })
            .orderBy('bl.createAt')
            .getMany();
    }

    async checkValid(
        dto: DeleteBoardLikeDto, //
    ): Promise<BoardLikeEntity> {
        return await this.boardLikeRepository
            .createQueryBuilder('bl')
            .select(['bl.id', 'bl.userID', 'bl.boardID'])
            .where('bl.id=:id', { id: dto.boardLikeID })
            .andWhere('bl.userID=:userID', { userID: dto.userID })
            .getOne();
    }

    async checkOverlap(
        dto: CreateBoardLikeDto, //
    ): Promise<BoardLikeEntity> {
        console.log('레포짓========', dto);

        console.log(
            await this.boardLikeRepository
                .createQueryBuilder('bl')
                .select(['bl.id', 'bl.userID', 'bl.boardID'])
                .where('bl.userID=:userID', { userID: dto.userID })
                .andWhere('bl.boardID=:boardID', { boardID: dto.boardID })
                .getOne(),
        );

        return await this.boardLikeRepository
            .createQueryBuilder('bl')
            .select(['bl.id', 'bl.userID', 'bl.boardID'])
            .where('bl.userID=:userID', { userID: dto.userID })
            .andWhere('bl.boardID=:boardID', { boardID: dto.boardID })
            .getOne();
    }

    // 등록
    async save(
        boardLike: Partial<Omit<BoardLikeEntity, 'id'>>, //
    ): Promise<BoardLikeEntity> {
        return await this.boardLikeRepository.save(boardLike);
    }

    // 삭제
    async delete(
        boardLikeID: string, //
    ): Promise<DeleteResult> {
        return await this.boardLikeRepository.delete({
            id: boardLikeID,
        });
    }
}
