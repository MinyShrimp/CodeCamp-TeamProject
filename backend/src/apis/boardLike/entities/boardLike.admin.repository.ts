import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateBoardLikeAdminInput } from '../dto/createBoardLike.admin.input';
import { UpdateBoardLikeAdminInput } from '../dto/updateBoardLike.admin.input';

import { BoardLikeEntity } from './boardLike.entity';

@Injectable()
export class BoardLikeAdminRepository {
    constructor(
        @InjectRepository(BoardLikeEntity)
        private readonly boardLikeRepository: Repository<BoardLikeEntity>,
    ) {}

    private readonly _selector = [];

    async findAll(): Promise<BoardLikeEntity[]> {
        return await this.boardLikeRepository
            .createQueryBuilder('boardLike')
            .select(this._selector)
            .withDeleted()
            .orderBy('boardLike.createAt')
            .getMany();
    }

    async findAllNames(): Promise<BoardLikeEntity[]> {
        return await this.boardLikeRepository
            .createQueryBuilder('boardLike')
            .select(['boardLike.id', 'boardLike.name'])
            .orderBy('boardLike.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<BoardLikeEntity> {
        return await this.boardLikeRepository
            .createQueryBuilder('boardLike')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('boardLike.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateBoardLikeAdminInput, //
    ): Promise<BoardLikeEntity> {
        return await this.boardLikeRepository.save(input);
    }

    async update(
        input: UpdateBoardLikeAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.boardLikeRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.boardLikeRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
