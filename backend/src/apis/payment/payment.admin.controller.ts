import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    Param,
} from '@nestjs/common';
import { PaymentAdminRepository } from './entities/payment.admin.repository';
import { PaymentEntity } from './entities/payment.entity';

@Controller('admin/payment')
export class PaymentAdminController {
    constructor(
        private readonly paymentAdminRepository: PaymentAdminRepository,
    ) {}

    @Get('/all')
    findAll(): Promise<PaymentEntity[]> {
        return this.paymentAdminRepository.findAll();
    }

    @Get('/names')
    findAllNames(): Promise<PaymentEntity[]> {
        return this.paymentAdminRepository.findAllNames();
    }

    @Get('/:id')
    findOne(
        @Param('id') paymentID: string, //
    ): Promise<PaymentEntity> {
        return this.paymentAdminRepository.findOne(paymentID);
    }

    @Delete('/bulk')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ): Promise<boolean[]> {
        const results = await this.paymentAdminRepository.bulkDelete(IDs);
        return results.map((r) => (r.affected ? true : false));
    }
}
