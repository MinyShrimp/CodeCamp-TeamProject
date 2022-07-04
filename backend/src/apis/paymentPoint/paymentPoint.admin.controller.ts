// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';

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

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.paymentPointAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
