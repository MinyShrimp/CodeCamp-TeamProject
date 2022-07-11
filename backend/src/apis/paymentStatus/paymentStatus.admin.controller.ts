// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePaymentStatusInput } from './dto/createPaymentStatus.input';
import { UpdatePaymentStatusInput } from './dto/updatePaymentStatus.input';

import { PaymentStatusEntity } from './entities/paymentStatus.entity';
import { PaymentStatusAdminRepository } from './entities/paymentStatus.admin.repository';

@ApiTags('관리자/결제/상태')
@Controller('admin/payment-status')
export class PaymentStatusAdminController {
    constructor(
        private readonly paymentStatusRepository: PaymentStatusAdminRepository,
    ) {}

    @Get('/all')
    findAll(): Promise<PaymentStatusEntity[]> {
        return this.paymentStatusRepository.findAll();
    }

    @Get('/names')
    async findAllNames(): Promise<Array<string>> {
        const results = await this.paymentStatusRepository.findAllNames();
        return results.map((r) => r.id);
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<PaymentStatusEntity> {
        return this.paymentStatusRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreatePaymentStatusInput, //
    ): Promise<PaymentStatusEntity> {
        return this.paymentStatusRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdatePaymentStatusInput, //
    ): Promise<boolean> {
        const result = await this.paymentStatusRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.paymentStatusRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
