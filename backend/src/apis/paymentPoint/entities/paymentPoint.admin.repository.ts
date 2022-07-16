import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { PaymentPointEntity } from './paymentPoint.entity';

@Injectable()
export class PaymentPointAdminRepository {
    constructor(
        @InjectRepository(PaymentPointEntity)
        private readonly paymentPointRepository: Repository<PaymentPointEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'pp.id', 'pp.point', 'pp.createAt',
        'pps.id', 'u.id', 'u.email', 'n.id', 'n.title', 'ni.id', 'ni.title',
    ];

    async findAll(): Promise<PaymentPointEntity[]> {
        return await this.paymentPointRepository
            .createQueryBuilder('pp')
            .select(this._selector)
            .withDeleted()
            .leftJoin('pp.status', 'pps')
            .leftJoin('pp.user', 'u')
            .leftJoin('pp.novel', 'n')
            .leftJoin('pp.novelIndex', 'ni')
            .orderBy('pp.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<PaymentPointEntity> {
        return await this.paymentPointRepository
            .createQueryBuilder('pp')
            .select(this._selector)
            .withDeleted()
            .leftJoin('pp.status', 'pps')
            .leftJoin('pp.user', 'u')
            .leftJoin('pp.novel', 'n')
            .leftJoin('pp.novelIndex', 'ni')
            .where('pp.id=:id', { id: id })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.paymentPointRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
