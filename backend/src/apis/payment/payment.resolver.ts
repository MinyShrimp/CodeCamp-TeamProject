import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { PaymentEntity } from './entities/payment.entity';
import { PaymentRepository } from './entities/payment.repository';
import { CreatePaymentInput } from './dto/createPayment.input';
import { CancelPaymentInput } from './dto/cancelPayment.input';
import { FetchPaymentOutput } from './dto/fetchPayments.output';

import { PaymentService } from './payment.service';

@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService, //
        private readonly paymentRepository: PaymentRepository,
    ) {}

    @Query(
        () => FetchPaymentOutput, //
        { description: '회원 결제 목록, Pagenation' },
    )
    fetchPaymentsInUser(
        @CurrentUser() payload: IPayload, //
        @Args({ name: 'page', type: () => Int, defaultValue: 1 })
        page: number,
    ): Promise<FetchPaymentOutput> {
        return this.paymentRepository.getPage(payload.id, page);
    }

    @Mutation(
        () => PaymentEntity, //
        { description: '결제 정보 저장' },
    )
    createPayment(
        @CurrentUser() currentUser: IPayload,
        @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    ): Promise<PaymentEntity> {
        return this.paymentService.createPayment(
            currentUser,
            createPaymentInput,
        );
    }

    @Mutation(
        () => PaymentEntity, //
        { description: '결제 전부 취소' },
    )
    cancelPayment(
        @CurrentUser() currentUser: IPayload,
        @Args('cancelPaymentInput') cancelPaymentInput: CancelPaymentInput,
    ): Promise<PaymentEntity> {
        return this.paymentService.cancelPayment(
            currentUser,
            cancelPaymentInput,
        );
    }
}
