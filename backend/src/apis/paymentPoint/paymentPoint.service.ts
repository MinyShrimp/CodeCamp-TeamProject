import { ConflictException, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/commons/message/Message.enum';

import { NovelService } from '../novel/novel.service';
import { NovelIndexService } from '../novelIndex/novelIndex.service';

import { PaidDto } from './dto/paid.dto';
import { DonateDto } from './dto/donate.dto';
import { CancelDto } from './dto/cancel.dto';

import { PaymentPointEntity } from './entities/paymentPoint.entity';
import { PaymentPointRepository } from './entities/paymentPoint.repository';

@Injectable()
export class PaymentPointService {
    constructor(
        private readonly novelService: NovelService,
        private readonly novelIndexService: NovelIndexService,

        private readonly paymentPointRepository: PaymentPointRepository, //
    ) {}

    // 존재 확인
    async checkValid(
        dto: CancelDto, //
    ): Promise<boolean> {
        const check = await this.paymentPointRepository.checkValid(dto);
        if (!check) {
            throw new ConflictException(MESSAGES.POINT_PAYMENT_UNVALID);
        }
        return true;
    }

    // 중복 확인
    async checkOverlap(
        dto: PaidDto, //
    ): Promise<boolean> {
        const check = await this.paymentPointRepository.checkOverlap(dto);
        if (check) {
            throw new ConflictException(MESSAGES.POINT_PAYMENT_OVERLAP);
        }
        return true;
    }

    // 일반 결제
    async payment(
        dto: PaidDto, //
    ): Promise<PaymentPointEntity> {
        // 에피소드 존재 확인
        await this.novelIndexService.checkValid(dto.novelIndexID);

        // 중복 확인
        await this.checkOverlap(dto);

        // 결제
        return await this.paymentPointRepository.paid(dto);
    }

    // 후원 결제
    async donate(
        dto: DonateDto, //
    ): Promise<PaymentPointEntity> {
        // 소설 존재 확인
        await this.novelService.checkValid(dto.novelID);

        // 후원
        return await this.paymentPointRepository.donate(dto);
    }

    // 결제 취소
    async cancel(
        dto: CancelDto, //
    ): Promise<PaymentPointEntity> {
        // 결제 존재 확인
        await this.checkValid(dto);

        // 취소
        return await this.paymentPointRepository.cancel(dto);
    }
}
