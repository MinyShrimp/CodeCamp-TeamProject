// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePaymentPointStatusAdminInput } from './dto/createPaymentPointStatus.admin.input';
import { UpdatePaymentPointStatusAdminInput } from './dto/updatePaymentPointStatus.admin.input';

import { PaymentPointStatusEntity } from './entities/paymentPointStatus.entity';
import { PaymentPointStatusAdminRepository } from './entities/paymentPointStatus.admin.repository';

@ApiTags('관리자/결제/포인트/상태')
@Controller('api/admin/payment-point-status')
export class PaymentPointStatusAdminController {
    constructor(
        private readonly paymentPointStatusAdminRepository: PaymentPointStatusAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<PaymentPointStatusEntity[]> {
        return this.paymentPointStatusAdminRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<string>> {
        const results =
            await this.paymentPointStatusAdminRepository.findAllNames();
        return results.map((r) => r.id);
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<PaymentPointStatusEntity> {
        return this.paymentPointStatusAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreatePaymentPointStatusAdminInput, //
    ): Promise<PaymentPointStatusEntity> {
        return this.paymentPointStatusAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdatePaymentPointStatusAdminInput, //
    ): Promise<boolean> {
        const result = await this.paymentPointStatusAdminRepository.update(
            input,
        );
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.paymentPointStatusAdminRepository.bulkDelete(
            IDs,
        );
        return results.map((r) => (r.affected ? true : false));
    }
}
