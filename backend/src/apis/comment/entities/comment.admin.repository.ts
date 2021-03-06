import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentAdminRepository {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    private readonly _selector = [
        'comment.id',
        'comment.contents',
        'comment.likeCount',
        'comment.dislikeCount',
        'comment.createAt',
        'comment.updateAt',
        'comment.deleteAt',
        'user.id',
        'user.email',
        'board.id',
        'board.title',
    ];

    async findAll(): Promise<CommentEntity[]> {
        return await this.commentRepository
            .createQueryBuilder('comment')
            .select(this._selector)
            .withDeleted()
            .leftJoin('comment.user', 'user')
            .leftJoin('comment.board', 'board')
            .orderBy('comment.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<CommentEntity> {
        return await this.commentRepository
            .createQueryBuilder('comment')
            .select([
                ...this._selector, //
                'children.id',
                'children.contents',
            ])
            .withDeleted()
            .leftJoin('comment.user', 'user')
            .leftJoin('comment.board', 'board')
            .leftJoin('comment.children', 'children')
            .where('comment.id=:id', { id: id })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.commentRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
