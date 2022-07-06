import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

import { PaymentEntity } from './entities/payment.entity';
import { PaymentRepository } from './entities/payment.repository';
import { PaymentAdminRepository } from './entities/payment.admin.repository';
import { PaymentAdminController } from './payment.admin.controller';

import { IMPService } from './imp.service';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { PaymentCheckService } from './paymentCheck.service';
import { PaymentController } from './payment.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentEntity, //
        ]),
        UserModule,
        ProductModule,
    ],
    controllers: [
        PaymentController,
        PaymentAdminController, //
    ],
    providers: [
        PaymentAdminRepository, //

        IMPService,
        PaymentService,
        PaymentResolver,
        PaymentRepository,
        PaymentCheckService,
    ],
})
export class PaymentModule {}
