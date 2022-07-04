import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentPointEntity } from './entities/paymentPoint.entity';
import { PaymentPointAdminRepository } from './entities/paymentPoint.admin.repository';

import { PaymentPointAdminController } from './paymentPoint.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentPointEntity, //
        ]),
    ],
    controllers: [
        PaymentPointAdminController, //
    ],
    providers: [
        PaymentPointAdminRepository, //
    ],
})
export class PaymentPointModule {}
