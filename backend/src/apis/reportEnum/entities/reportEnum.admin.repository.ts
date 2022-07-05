import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateReportEnumAdminInput } from '../dto/createReportEnum.admin.input';
import { UpdateReportEnumAdminInput } from '../dto/updateReportEnum.admin.input';

import { ReportEnumEntity } from './reportEnum.entity';

@Injectable()
export class ReportEnumAdminRepository {
    constructor(
        @InjectRepository(ReportEnumEntity)
        private readonly reportEnumRepository: Repository<ReportEnumEntity>,
    ) {}

    private readonly _selector = [
        'reportEnum.id',
        'reportEnum.table',
        'reportEnum.description',
    ];

    async findAll(): Promise<ReportEnumEntity[]> {
        return await this.reportEnumRepository
            .createQueryBuilder('reportEnum')
            .select(this._selector)
            .withDeleted()
            .orderBy('reportEnum.createAt')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<ReportEnumEntity> {
        return await this.reportEnumRepository
            .createQueryBuilder('reportEnum')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('reportEnum.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateReportEnumAdminInput, //
    ): Promise<ReportEnumEntity> {
        return await this.reportEnumRepository.save(input);
    }

    async update(
        input: UpdateReportEnumAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.reportEnumRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.reportEnumRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
