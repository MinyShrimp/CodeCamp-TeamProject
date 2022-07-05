import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

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
