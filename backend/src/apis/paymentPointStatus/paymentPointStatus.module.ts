import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentPointStatusEntity } from './entities/paymentPointStatus.entity';
import { PaymentPointStatusAdminRepository } from './entities/paymentPointStatus.admin.repository';

import { PaymentPointStatusAdminController } from './paymentPointStatus.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentPointStatusEntity, //
        ]),
    ],
    controllers: [
        PaymentPointStatusAdminController, //
    ],
    providers: [
        PaymentPointStatusAdminRepository, //
    ],
})
export class PaymentPointStatusModule {}
