import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateCommentLikeAdminInput } from '../dto/createCommentLike.admin.input';
import { UpdateCommentLikeAdminInput } from '../dto/updateCommentLike.admin.input';

import { CommentLikeEntity } from './commentLike.entity';

@Injectable()
export class CommentLikeAdminRepository {
    constructor(
        @InjectRepository(CommentLikeEntity)
        private readonly commentLikeRepository: Repository<CommentLikeEntity>,
    ) {}

    private readonly _selector = [];

    async findAll(): Promise<CommentLikeEntity[]> {
        return await this.commentLikeRepository
            .createQueryBuilder('commentLike')
            .select(this._selector)
            .withDeleted()
            .orderBy('commentLike.createAt')
            .getMany();
    }

    async findAllNames(): Promise<CommentLikeEntity[]> {
        return await this.commentLikeRepository
            .createQueryBuilder('commentLike')
            .select(['commentLike.id', 'commentLike.name'])
            .orderBy('commentLike.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<CommentLikeEntity> {
        return await this.commentLikeRepository
            .createQueryBuilder('commentLike')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('commentLike.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateCommentLikeAdminInput, //
    ): Promise<CommentLikeEntity> {
        return await this.commentLikeRepository.save(input);
    }

    async update(
        input: UpdateCommentLikeAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.commentLikeRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.commentLikeRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
