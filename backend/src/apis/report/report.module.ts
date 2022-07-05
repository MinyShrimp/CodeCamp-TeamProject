import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportEntity } from './entities/report.entity';
import { ReportAdminRepository } from './entities/report.admin.repository';

import { ReportAdminController } from './report.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ReportEntity, //
        ]),
    ],
    controllers: [
        ReportAdminController, //
    ],
    providers: [
        ReportAdminRepository, //
    ],
})
export class ReportModule {}
