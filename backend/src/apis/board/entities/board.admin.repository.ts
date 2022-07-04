import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateBoardAdminInput } from '../dto/createBoard.admin.input';
import { UpdateBoardAdminInput } from '../dto/updateBoard.admin.input';

import { BoardEntity } from './board.entity';

@Injectable()
export class BoardAdminRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
    ) {}

    private readonly _selector = [];

    async findAll(): Promise<BoardEntity[]> {
        return await this.boardRepository
            .createQueryBuilder('board')
            .select(this._selector)
            .withDeleted()
            .orderBy('board.createAt')
            .getMany();
    }

    async findAllNames(): Promise<BoardEntity[]> {
        return await this.boardRepository
            .createQueryBuilder('board')
            .select(['board.id', 'board.name'])
            .orderBy('')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<BoardEntity> {
        return await this.boardRepository
            .createQueryBuilder('board')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('board.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateBoardAdminInput, //
    ): Promise<BoardEntity> {
        return await this.boardRepository.save(input);
    }

    async update(
        input: UpdateBoardAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.boardRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.boardRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
