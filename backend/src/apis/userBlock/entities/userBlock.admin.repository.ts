import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateUserBlockAdminInput } from '../dto/createUserBlock.admin.input';
import { UpdateUserBlockAdminInput } from '../dto/updateUserBlock.admin.input';

import { UserBlockEntity } from './userBlock.entity';

@Injectable()
export class UserBlockAdminRepository {
    constructor(
        @InjectRepository(UserBlockEntity)
        private readonly userBlockRepository: Repository<UserBlockEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'userBlock.id', 'userBlock.createAt',
        'from.id', 'from.email',
        'to.id', 'to.email',
    ];

    async findAll(): Promise<UserBlockEntity[]> {
        return await this.userBlockRepository
            .createQueryBuilder('userBlock')
            .select(this._selector)
            .withDeleted()
            .leftJoin('userBlock.to', 'to')
            .leftJoin('userBlock.from', 'from')
            .orderBy('userBlock.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<UserBlockEntity> {
        return await this.userBlockRepository
            .createQueryBuilder('userBlock')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .leftJoin('userBlock.to', 'to')
            .leftJoin('userBlock.from', 'from')
            .where('userBlock.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateUserBlockAdminInput, //
    ): Promise<UserBlockEntity> {
        return await this.userBlockRepository.save(input);
    }

    async update(
        input: UpdateUserBlockAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.userBlockRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.userBlockRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
