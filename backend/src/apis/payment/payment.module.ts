import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentAdminRepository } from './entities/payment.admin.repository';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentAdminController } from './payment.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentEntity, //
        ]),
    ],
    controllers: [
        PaymentAdminController, //
    ],
    providers: [
        PaymentAdminRepository, //
    ],
})
export class PaymentModule {}
