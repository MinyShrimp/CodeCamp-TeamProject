// prettier-ignore
import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaymentPointEntity } from './entities/paymentPoint.entity';
import { PaymentPointAdminRepository } from './entities/paymentPoint.admin.repository';

@ApiTags('관리자/결제/포인트')
@Controller('api/admin/payment-point')
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
