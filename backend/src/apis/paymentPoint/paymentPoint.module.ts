import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { NovelModule } from '../novel/novel.module';
import { NovelIndexModule } from '../novelIndex/novelIndex.module';

import { PaymentPointEntity } from './entities/paymentPoint.entity';
import { PaymentPointRepository } from './entities/paymentPoint.repository';
import { PaymentPointAdminRepository } from './entities/paymentPoint.admin.repository';

import { PaymentPointService } from './paymentPoint.service';
import { PaymentPointResolver } from './paymentPoint.resolver';
import { PaymentPointAdminController } from './paymentPoint.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentPointEntity, //
        ]),

        UserModule,
        NovelModule,
        NovelIndexModule,
    ],
    controllers: [
        PaymentPointAdminController, //
    ],
    providers: [
        PaymentPointAdminRepository, //

        PaymentPointService,
        PaymentPointResolver,
        PaymentPointRepository,
    ],
})
export class PaymentPointModule {}
