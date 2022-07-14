import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { PaymentPointEntity } from './entities/paymentPoint.entity';
import { DonatePaymentPointInput } from './dto/donate.input';

import { PaymentPointService } from './paymentPoint.service';

@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class PaymentPointResolver {
    constructor(
        private readonly paymentPointService: PaymentPointService, //
    ) {}

    // 일반 결제
    @Mutation(
        () => PaymentPointEntity,
        { description: '에피소드 결제' }, //
    )
    paidPoint(
        @CurrentUser() payload: IPayload, //
        @Args({
            name: 'novelIndexID', //
            description: '에피소드 UUID',
        })
        novelIndexID: string, //
    ): Promise<PaymentPointEntity> {
        return this.paymentPointService.payment({
            userID: payload.id,
            novelIndexID: novelIndexID, //
        });
    }

    // 후원 결제
    @Mutation(
        () => PaymentPointEntity,
        { description: '후원 결제' }, //
    )
    donatePoint(
        @CurrentUser() payload: IPayload, //
        @Args('donateInput') donateInput: DonatePaymentPointInput,
    ): Promise<PaymentPointEntity> {
        return this.paymentPointService.donate({
            userID: payload.id,
            ...donateInput, //
        });
    }

    // 환불
    @Mutation(
        () => ResultMessage,
        { description: '포인트 결제 취소' }, //
    )
    cancelPointPayment(
        @CurrentUser() payload: IPayload,
        @Args({
            name: 'paymentPointID', //
            description: '포인트 결제 UUID',
        })
        paymentPointID: string,
    ): Promise<PaymentPointEntity> {
        return this.paymentPointService.cancel({
            userID: payload.id,
            paymentPointID: paymentPointID, //
        });
    }
}
