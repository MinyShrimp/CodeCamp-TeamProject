import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentAdminRepository {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
    ) {}

    private readonly _selector = [
        'p.id',
        'p.impUid',
        'p.merchantUid',
        'p.amount',
        'p.createAt',
        'u.id',
        'u.email',
        'pd.id',
        'pd.name',
        's.id',
    ];

    async findAll(): Promise<PaymentEntity[]> {
        return await this.paymentRepository
            .createQueryBuilder('p')
            .select(this._selector)
            .leftJoin('p.user', 'u')
            .leftJoin('p.product', 'pd')
            .leftJoin('p.status', 's')
            .orderBy('p.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<PaymentEntity> {
        return await this.paymentRepository
            .createQueryBuilder('p')
            .select(this._selector)
            .leftJoin('p.user', 'u')
            .leftJoin('p.product', 'pd')
            .leftJoin('p.status', 's')
            .where('p.id=:id', { id: id })
            .getOne();
    }

    async findAllNames(): Promise<PaymentEntity[]> {
        return await this.paymentRepository
            .createQueryBuilder('p')
            .select(['p.id', 'p.name'])
            .getMany();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.paymentRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
