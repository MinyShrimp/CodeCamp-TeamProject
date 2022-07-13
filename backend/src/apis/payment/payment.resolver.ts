import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Logger, Post, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlJwtAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { PaymentEntity } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/createPayment.input';
import { CancelPaymentInput } from './dto/cancelPayment.input';

import { PaymentService } from './payment.service';

@ApiTags('결제')
@Resolver()
@UseGuards(GqlJwtAccessGuard)
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService, //
    ) {}

    private readonly logger = new Logger('Payment');

    @ApiOperation({
        summary: '결제 정보 저장',
        requestBody: {
            content: {},
        },
    })
    @Mutation(
        () => PaymentEntity, //
        { description: '결제 정보 저장' },
    )
    createPayment(
        @CurrentUser() currentUser: IPayload,
        @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    ): Promise<PaymentEntity> {
        this.logger.log(`${currentUser.nickName} - createPayment`);

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
        this.logger.log(`${currentUser.nickName} - cancelPayment`);

        return this.paymentService.cancelPayment(
            currentUser,
            cancelPaymentInput,
        );
    }
}
