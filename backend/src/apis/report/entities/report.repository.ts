import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CancelReportDto } from '../dto/cancelReport.dto';
import { ReportEntity } from './report.entity';

@Injectable()
export class ReportRepository {
    constructor(
        @InjectRepository(ReportEntity)
        private readonly reportRepository: Repository<ReportEntity>,
    ) {}

    // 존재 체크
    async checkValid(
        dto: CancelReportDto, //
    ): Promise<ReportEntity> {
        return await this.reportRepository
            .createQueryBuilder('r')
            .select(['r.id', 'r.userID'])
            .where('r.id=:id', { id: dto.reportID })
            .andWhere('r.userID=:userID', { userID: dto.userID })
            .getOne();
    }

    // 저장
    async save(
        entity: Partial<Omit<ReportEntity, 'id'>>, //
    ): Promise<ReportEntity> {
        return await this.reportRepository.save(entity);
    }

    // 취소
    async softDelete(
        reportID: string, //
    ): Promise<DeleteResult> {
        return await this.reportRepository.softDelete({
            id: reportID,
        });
    }
}
