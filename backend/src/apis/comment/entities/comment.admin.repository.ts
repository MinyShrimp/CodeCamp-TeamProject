import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateCommentAdminInput } from '../dto/createComment.admin.input';
import { UpdateCommentAdminInput } from '../dto/updateComment.admin.input';

import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentAdminRepository {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    private readonly _selector = [];

    async findAll(): Promise<CommentEntity[]> {
        return await this.commentRepository
            .createQueryBuilder('comment')
            .select(this._selector)
            .withDeleted()
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
            ])
            .withDeleted()
            .where('comment.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateCommentAdminInput, //
    ): Promise<CommentEntity> {
        return await this.commentRepository.save(input);
    }

    async update(
        input: UpdateCommentAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.commentRepository.update({ id: originID }, rest);
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
