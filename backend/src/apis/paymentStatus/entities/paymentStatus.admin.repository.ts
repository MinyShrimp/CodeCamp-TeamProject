import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePaymentStatusInput } from '../dto/createPaymentStatus.input';
import { UpdatePaymentStatusInput } from '../dto/updatePaymentStatus.input';
import { PaymentStatusEntity } from './paymentStatus.entity';

@Injectable()
export class PaymentStatusAdminRepository {
    constructor(
        @InjectRepository(PaymentStatusEntity)
        private readonly paymentStatusRepository: Repository<PaymentStatusEntity>,
    ) {}

    private readonly _selector = ['status.id', 'status.description'];

    async findAll(): Promise<PaymentStatusEntity[]> {
        return await this.paymentStatusRepository
            .createQueryBuilder('status')
            .select(this._selector)
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<PaymentStatusEntity> {
        return await this.paymentStatusRepository
            .createQueryBuilder('status')
            .select(this._selector)
            .where('status.id=:id', { id: id })
            .getOne();
    }

    async findAllNames(): Promise<PaymentStatusEntity[]> {
        return await this.paymentStatusRepository
            .createQueryBuilder('status')
            .select(['status.id'])
            .getMany();
    }

    async create(
        input: CreatePaymentStatusInput, //
    ): Promise<PaymentStatusEntity> {
        return await this.paymentStatusRepository.save({
            ...input,
        });
    }

    async update(
        input: UpdatePaymentStatusInput, //
    ): Promise<UpdateResult> {
        const { originID, ...updateInfo } = input;

        return await this.paymentStatusRepository.update(
            { id: input.originID },
            { ...updateInfo },
        );
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.paymentStatusRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
