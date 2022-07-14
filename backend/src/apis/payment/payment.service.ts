import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { IPayload } from 'src/commons/interfaces/Payload.interface';

import { PaymentStatusEntity } from '../paymentStatus/entities/paymentStatus.entity';

import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/entities/user.repository';
import { UserCheckService } from '../user/userCheck.service';

import { ProductEntity } from '../product/entities/product.entity';
import { ProductCheckService } from '../product/productCheck.service';

import { IPaymentInput } from './interface/payment';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentRepository } from './entities/payment.repository';
import { CreatePaymentInput } from './dto/createPayment.input';
import { CancelPaymentInput } from './dto/cancelPayment.input';

import { IMPService } from './imp.service';
import { PaymentCheckService } from './paymentCheck.service';

@Injectable()
export class PaymentService {
    constructor(
        private readonly connection: Connection,
        private readonly impService: IMPService,

        private readonly userRepository: UserRepository,
        private readonly userCheckService: UserCheckService,

        private readonly productCheckService: ProductCheckService,

        private readonly paymentRepository: PaymentRepository,
        private readonly paymentCheckService: PaymentCheckService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 금액 수정 //

    private async paymentTransaction(props: {
        userID: string;
        statusID: string;
        productID: string;
        input: IPaymentInput;
        isCancel: boolean;
    }): Promise<PaymentEntity> {
        const queryRunner = this.connection.createQueryRunner();

        // 트랜잭션 시작
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        let payment: PaymentEntity = null;

        try {
            // 유저
            const user = await queryRunner.manager.findOne(
                UserEntity,
                { id: props.userID },
                { lock: { mode: 'pessimistic_write' } },
            );
            this.userCheckService.checkValidUser(user);

            // 상품
            const product = await queryRunner.manager.findOne(
                ProductEntity,
                { id: props.productID },
                { lock: { mode: 'pessimistic_write' } },
            );
            this.productCheckService.checkValid(product);

            // 결제 상태
            const status = await queryRunner.manager.findOne(
                PaymentStatusEntity,
                { id: props.statusID },
                { lock: { mode: 'pessimistic_write' } },
            );

            // 결제 DB에 추가
            payment = this.paymentRepository.create({
                ...props.input,
                user: user,
                status: status,
                product: product,
            });
            await queryRunner.manager.save(payment);

            // 회원 포인트 수정
            const updateUser = this.userRepository.create({
                ...user,
                point: user.point + product.point * (props.isCancel ? -1 : 1),
            });
            await queryRunner.manager.save(updateUser);

            // 커밋
            await queryRunner.commitTransaction();
        } catch (e) {
            // 롤백
            await queryRunner.rollbackTransaction();
        } finally {
            // 트랜잭션 종료
            await queryRunner.release();
        }

        return payment;
    }

    ///////////////////////////////////////////////////////////////////
    // 새로운 결제 정보 //

    /**
     * 새로운 결제 정보
     */
    async createPayment(
        currentUser: IPayload,
        createPaymentInput: CreatePaymentInput, //
    ): Promise<PaymentEntity> {
        // 결제 정보 검증
        const impPaymentData = await this.impService.sendData(
            createPaymentInput.impUid,
        );
        this.impService.checkData(createPaymentInput, impPaymentData);
        await this.impService.checkOverlapUID(createPaymentInput.impUid);

        const { productID, ...input } = createPaymentInput;
        return await this.paymentTransaction({
            userID: currentUser.id,
            statusID: 'PAID',
            productID,
            input,
            isCancel: false,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 결제 취소 //

    /**
     * 결제 취소
     */
    async cancelPayment(
        currentUser: IPayload,
        cancelPaymentInput: CancelPaymentInput, //
    ): Promise<PaymentEntity> {
        // DB에 저장된 결제 정보 가져오기
        const payments = await this.paymentRepository.findMany(
            cancelPaymentInput,
        );
        const payment = payments[0];

        // 결제 정보가 존재하는지 검사
        this.paymentCheckService.checkValidPayment(payments);

        // 회원 검사
        this.userCheckService.checkPayload(payment.user, currentUser);

        // 남은 결제 금액 찾기
        const checksum = await this.paymentRepository.findSum(
            cancelPaymentInput,
        );

        // 이미 취소되었는지 검사
        this.paymentCheckService.checkAlreadyCancel(checksum);

        // IamPort에 응답 받기
        const impCancelData = await this.impService.sendCancelData(
            payment,
            checksum,
        );

        return await this.paymentTransaction({
            userID: payment.user.id,
            statusID: 'CANCELLED',
            productID: payment.product.id,
            input: impCancelData,
            isCancel: true,
        });
    }
}
