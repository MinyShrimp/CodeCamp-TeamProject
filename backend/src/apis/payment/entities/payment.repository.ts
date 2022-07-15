import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { FetchPaymentOutput } from '../dto/fetchPayments.output';

import { IPaymentFind } from '../interface/payment';
import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
    ) {}

    /**
     * Return Inject Repository
     */
    getThis(): Readonly<Repository<PaymentEntity>> {
        return this.paymentRepository;
    }

    /**
     * Get 전체 갯수
     */
    async count(
        option?: FindManyOptions<PaymentEntity>, //
    ): Promise<number> {
        return this.paymentRepository.count(option);
    }

    /**
     * 유저 기반 페이지 조회
     */
    async getPage(
        userID: string, //
        page: number,
    ): Promise<FetchPaymentOutput> {
        const take = 10;

        const payments = await this.paymentRepository.find({
            relations: ['user', 'product', 'status'],
            where: {
                user: {
                    id: userID,
                },
            },
            order: {
                createAt: 'ASC',
            },
            take: take,
            skip: take * (page - 1),
        });

        const count = await this.count({
            where: {
                user: { id: userID },
            },
        });

        return {
            payments: payments,
            count: count,
        };
    }

    /**
     * impUid와 merchantUid에 해당하는 모든 결제 정보 가져오기
     */
    async findMany(
        findOption: IPaymentFind, //
    ): Promise<PaymentEntity[]> {
        return await this.paymentRepository.find({
            relations: ['user', 'product', 'status'],
            where: {
                impUid: findOption.impUid,
                merchantUid: findOption.merchantUid,
            },
            order: {
                createAt: 'ASC',
            },
        });
    }

    /**
     * 남은 결제 금액 가져오기
     */
    async findSum(
        findOption: IPaymentFind, //
    ): Promise<number> {
        return parseInt(
            (
                await this.paymentRepository.query(`
                    select sum(p.amount) as sumAmount
                    from payment p 
                    where p.impUid="${findOption.impUid}" 
                    and p.merchantUid="${findOption.merchantUid}"
                    ;
                `)
            )[0].sumAmount,
        );
    }

    /**
     * 결제 정보 생성
     */
    create(
        payment: Partial<PaymentEntity>, //
    ): PaymentEntity {
        return this.paymentRepository.create(payment);
    }
}
