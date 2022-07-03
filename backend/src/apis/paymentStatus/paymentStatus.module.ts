import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatusAdminRepository } from './entities/paymentStatus.admin.repository';

import { PaymentStatusEntity } from './entities/paymentStatus.entity';
import { PaymentStatusAdminController } from './paymentStatus.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentStatusEntity, //
        ]),
    ],
    controllers: [
        PaymentStatusAdminController, //
    ],
    providers: [
        PaymentStatusAdminRepository, //
    ],
})
export class PaymentStatusModule {}
