// prettier-ignore
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreatePaymentPointAdminInput } from './dto/createPaymentPoint.admin.input';
import { UpdatePaymentPointAdminInput } from './dto/updatePaymentPoint.admin.input';

import { PaymentPointEntity } from './entities/paymentPoint.entity';
import { PaymentPointAdminRepository } from './entities/paymentPoint.admin.repository';

@Controller('admin/payment-point')
export class PaymentPointAdminController {
    constructor(
        private readonly paymentPointAdminRepository: PaymentPointAdminRepository, //
    ) {}

    @Get('/all')
    findAll(): Promise<PaymentPointEntity[]> {
        return this.paymentPointAdminRepository.findAll();
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string, //
    ): Promise<PaymentPointEntity> {
        return this.paymentPointAdminRepository.findOne(id);
    }

    @Post('/')
    create(
        @Body() input: CreatePaymentPointAdminInput, //
    ): Promise<PaymentPointEntity> {
        return this.paymentPointAdminRepository.create(input);
    }

    @Patch('/')
    async update(
        @Body() input: UpdatePaymentPointAdminInput, //
    ): Promise<boolean> {
        const result = await this.paymentPointAdminRepository.update(input);
        return result.affected ? true : false;
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.paymentPointAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
