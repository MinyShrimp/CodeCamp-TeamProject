import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportEnumEntity } from './entities/reportEnum.entity';
import { ReportEnumAdminRepository } from './entities/reportEnum.admin.repository';

import { ReportEnumAdminController } from './reportEnum.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ReportEnumEntity, //
        ]),
    ],
    controllers: [
        ReportEnumAdminController, //
    ],
    providers: [
        ReportEnumAdminRepository, //
    ],
})
export class ReportEnumModule {}
