import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreatePaymentStatusInput } from './dto/createPaymentStatus.input';
import { UpdatePaymentStatusInput } from './dto/updatePaymentStatus.input';
import { PaymentStatusAdminRepository } from './entities/paymentStatus.admin.repository';
import { PaymentStatusEntity } from './entities/paymentStatus.entity';

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
