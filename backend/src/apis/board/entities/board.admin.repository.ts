import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { BoardEntity } from './board.entity';

@Injectable()
export class BoardAdminRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'board.id', 'board.title', 'board.contents',
        'board.createAt', 'board.updateAt', 'board.deleteAt',
        'user.id', 'user.email',
    ];

    async findAll(): Promise<BoardEntity[]> {
        return await this.boardRepository
            .createQueryBuilder('board')
            .select(this._selector)
            .withDeleted()
            .leftJoin('board.user', 'user')
            .orderBy('board.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<BoardEntity> {
        return await this.boardRepository
            .createQueryBuilder('board')
            .select([
                ...this._selector, //
                'comment.id',
                'comment.contents',
            ])
            .withDeleted()
            .leftJoin('board.user', 'user')
            .leftJoin('board.comment', 'comment')
            .where('board.id=:id', { id: id })
            .getOne();
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
