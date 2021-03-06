import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { ReportEntity } from './report.entity';

@Injectable()
export class ReportAdminRepository {
    constructor(
        @InjectRepository(ReportEntity)
        private readonly reportRepository: Repository<ReportEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'report.id', 'report.title', 'report.contents', 'report.reportUUID', 
        'report.createAt', 'report.updateAt', 'report.deleteAt', 
        'enum.id', 'user.id', 'user.email'
    ];

    async findAll(): Promise<ReportEntity[]> {
        return await this.reportRepository
            .createQueryBuilder('report')
            .select(this._selector)
            .withDeleted()
            .leftJoin('report.user', 'user')
            .leftJoin('report.enum', 'enum')
            .orderBy('report.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<ReportEntity> {
        return await this.reportRepository
            .createQueryBuilder('report')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .leftJoin('report.user', 'user')
            .leftJoin('report.enum', 'enum')
            .where('report.id=:id', { id: id })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.reportRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
