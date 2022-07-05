import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateUserLikeAdminInput } from '../dto/createUserLike.admin.input';
import { UpdateUserLikeAdminInput } from '../dto/updateUserLike.admin.input';

import { UserLikeEntity } from './userLike.entity';

@Injectable()
export class UserLikeAdminRepository {
    constructor(
        @InjectRepository(UserLikeEntity)
        private readonly userLikeRepository: Repository<UserLikeEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'userLike.id', 'userLike.createAt',
        'from.id', 'from.email',
        'to.id', 'to.email',
    ];

    async findAll(): Promise<UserLikeEntity[]> {
        return await this.userLikeRepository
            .createQueryBuilder('userLike')
            .select(this._selector)
            .withDeleted()
            .leftJoin('userLike.to', 'to')
            .leftJoin('userLike.from', 'from')
            .orderBy('userLike.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<UserLikeEntity> {
        return await this.userLikeRepository
            .createQueryBuilder('userLike')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .leftJoin('userLike.to', 'to')
            .leftJoin('userLike.from', 'from')
            .where('userLike.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateUserLikeAdminInput, //
    ): Promise<UserLikeEntity> {
        return await this.userLikeRepository.save(input);
    }

    async update(
        input: UpdateUserLikeAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.userLikeRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.userLikeRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
