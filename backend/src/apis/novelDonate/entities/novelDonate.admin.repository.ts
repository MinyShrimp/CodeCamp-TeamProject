import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { NovelDonateEntity } from './novelDonate.entity';

@Injectable()
export class NovelDonateAdminRepository {
    constructor(
        @InjectRepository(NovelDonateEntity)
        private readonly novelDonateRepository: Repository<NovelDonateEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'dn.id', 'dn.createAt',
        'u.id', 'u.email', 'n.id', 'n.title'
    ];

    async findAll(): Promise<NovelDonateEntity[]> {
        return await this.novelDonateRepository
            .createQueryBuilder('dn')
            .select(this._selector)
            .withDeleted()
            .leftJoin('dn.user', 'u')
            .leftJoin('dn.novel', 'n')
            .orderBy('dn.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<NovelDonateEntity> {
        return await this.novelDonateRepository
            .createQueryBuilder('dn')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .leftJoin('dn.user', 'u')
            .leftJoin('dn.novel', 'n')
            .where('dn.id=:id', { id: id })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.novelDonateRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
