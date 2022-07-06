import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

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
     * impUid와 merchantUid에 해당하는 모든 결제 정보 가져오기
     */
    async findMany(
        findOption: IPaymentFind, //
    ): Promise<PaymentEntity[]> {
        return await this.paymentRepository
            .createQueryBuilder('p')
            .select([
                'p.id',
                'p.impUid',
                'p.merchantUid',
                'p.amount',
                'p.createAt',
                'u.id',
                'pd.id',
                's.id',
            ])
            .leftJoin('p.user', 'u')
            .leftJoin('p.product', 'pd')
            .leftJoin('p.status', 's')
            .where('p.impUid=:impUid', { impUid: findOption.impUid })
            .andWhere('p.merchantUid=:merchantUid', {
                merchantUid: findOption.merchantUid,
            })
            .getMany();
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
