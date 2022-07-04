import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateNoticeAdminInput } from '../dto/createNotice.admin.input';
import { UpdateNoticeAdminInput } from '../dto/updateNotice.admin.input';

import { NoticeEntity } from './notice.entity';

@Injectable()
export class NoticeAdminRepository {
    constructor(
        @InjectRepository(NoticeEntity)
        private readonly noticeRepository: Repository<NoticeEntity>,
    ) {}

    // prettier-ignore
    private readonly _selector = [
        'notice.id', 'notice.title', 'notice.contents', 
        'notice.createAt', 'notice.updateAt', 'notice.deleteAt', 
    ];

    async findAll(): Promise<NoticeEntity[]> {
        return await this.noticeRepository
            .createQueryBuilder('notice')
            .select(this._selector)
            .withDeleted()
            .orderBy('notice.createAt', 'DESC')
            .getMany();
    }

    async findOne(
        id: string, //
    ): Promise<NoticeEntity> {
        return await this.noticeRepository
            .createQueryBuilder('notice')
            .select([
                ...this._selector, //
            ])
            .withDeleted()
            .where('notice.id=:id', { id: id })
            .getOne();
    }

    async create(
        input: CreateNoticeAdminInput, //
    ): Promise<NoticeEntity> {
        return await this.noticeRepository.save(input);
    }

    async update(
        input: UpdateNoticeAdminInput, //
    ): Promise<UpdateResult> {
        const { originID, ...rest } = input;
        return await this.noticeRepository.update({ id: originID }, rest);
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) =>
                this.noticeRepository.delete({
                    id: id,
                }),
            ),
        );
    }
}
