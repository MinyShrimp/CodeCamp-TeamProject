import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';

import { ReportEntity } from './entities/report.entity';
import { ReportRepository } from './entities/report.repository';
import { ReportAdminRepository } from './entities/report.admin.repository';

import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { ReportAdminController } from './report.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ReportEntity, //
        ]),
        UserModule,
    ],
    controllers: [
        ReportAdminController, //
    ],
    providers: [
        ReportAdminRepository, //

        ReportService,
        ReportResolver,
        ReportRepository,
    ],
})
export class ReportModule {}
