import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreatePaymentPointStatusAdminInput } from '../dto/createPaymentPointStatus.admin.input';
import { UpdatePaymentPointStatusAdminInput } from '../dto/updatePaymentPointStatus.admin.input';

import { PaymentPointStatusEntity } from './paymentPointStatus.entity';

@Injectable()
export class PaymentPointStatusAdminRepository {
    constructor(
        @InjectRepository(PaymentPointStatusEntity)
        private readonly paymentPointStatusRepository: Repository<PaymentPointStatusEntity>,
    ) {}

    private readonly _selector = ['pps.id', 'pps.description'];

    async findAll(): Promise<PaymentPointStatusEntity[]> {
        return await this.paymentPointStatusRepository
            .createQueryBuilder('pps')
            .select(this._selector)
            .withDeleted()
            .getMany();
    }

    async findAllNames(): Promise<PaymentPointStatusEntity[]> {
        return await this.paymentPointStatusRepository
            .createQueryBuilder('pps')
            .select(['pps.id'])
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<PaymentPointStatusEntity> {
        return await this.paymentPointStatusRepository
            .createQueryBuilder('pps')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('pps.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreatePaymentPointStatusAdminInput, //
    ): Promise<PaymentPointStatusEntity> {
        return await this.paymentPointStatusRepository.save(input);
    }

    async update(
        input: UpdatePaymentPointStatusAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.paymentPointStatusRepository.update(
            { id: originID },
            rest,
        );
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.paymentPointStatusRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
